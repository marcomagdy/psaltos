import axios from 'axios';
import AWS from 'aws-sdk';
import { useState } from 'react';

AWS.config.update({
  accessKeyId: "AKIAWKMQZAIBQUYJ67HR",
  secretAccessKey: "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",
  region: 'us-east-1',
  signatureVersion: 'v4',
});

export const PopulateHymnsData = async (setHymns, setLoading) => {
    await axios
      .get("https://localhost:7226/asset", function (req, res) {
          res.header("Access-Control-Allow-Origin", "*");
      })
      .then((response) =>  {
        setHymns(response.data); 
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

export const UploadAsset = async (setError, setErrorMessage, setAddedToDb, typeId, englishName, copticName, file, selectedTags, setWarning) => {
    const s3 = new AWS.S3();
    const [hymns, setHymns] = useState([]);
    setError(false);
    setErrorMessage(null);
    if (!file) {
      setError(true);
      setErrorMessage("Please choose a file to upload.");
      return;
    }

    // S3
    const params = { 
      Bucket: 'test-bucket-hymns', 
      Key: `${Date.now()}.${file.name}`, 
      Body: file 
    };

    const { Location } = await s3.upload(params).promise().catch((error) => {
      setError(true);
      setErrorMessage("Seems S3 bucket is not working....");
      setAddedToDb(false);
      return;
    });

    console.log('uploading to s3', Location);

    const asset = { 
      TypeId: typeId, 
      Location: Location,
      EnglishName: englishName,
      CopticName: copticName
    };

    await axios.post("https://localhost:7226/asset",  asset)
    .then((response) =>  {
        console.log(response);
        if (response.status !== 200) {
          setError(true);
          setErrorMessage("We are able to upload to our database at this time.");
          return;
        }
        setAddedToDb(true);
      })
      .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage("We are able to upload to our database at this time.");
      });

      PopulateHymnsData(setHymns);
      const newAssetId = hymns[hymns.length - 1].asstId;

    await axios.post("https://localhost:7226/" + newAssetId + "/tag",  selectedTags)
    .then((response) =>  {
        console.log(response);
        if (response.status !== 200) {
            setWarning(true);
          return;
        }
        setAddedToDb(true);
      })
      .catch((error) => {
          console.log(error);
          setWarning(true);
      });
}

export const PopulateTagsData = async (tags) => {
    await axios
        .get("https://localhost:7226/tag", function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
        })
        .then((response) =>  {
        response.data.forEach(tag => {
            tags.push({key: tag.tagId, text: tag.englishName, value: tag.tagId});
        });
        })
        .catch((err) => console.log(err));
}

export const PopulateCategoriesData = async (categories) => {
    await axios
        .get("https://localhost:7226/category", function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
        })
        .then((response) =>  {
        response.data.forEach(category => {
            categories.push({key: category.categoryId, text: category.englishName, value: category.categoryId});
        });
        })
        .catch((err) => console.log(err));
}

export const UploadTag = async (setError, setErrorMessage, setAddedToDb, categoryId, englishName) => {
    const tag = {
        categoryId: categoryId,
        englishName: englishName
    };
    await axios.post("https://localhost:7226/tag",  tag)
    .then((response) =>  {
        console.log(response);
        if (response.status !== 200) {
          setError(true);
          setErrorMessage("We are able to upload to our database at this time.");
          return;
        }
        setAddedToDb(true);
      })
      .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage("We are able to upload to our database at this time.");
      });

}