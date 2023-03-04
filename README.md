# Ⲡⲥⲁⲗⲧⲟⲥ (Psaltos)
Coptic Hymns Reference Project

# Build instructions

A few dependencies are needed:
 - .NET core SDK
 - MySQL installation
 - NPM package manager 

 To install on a macOS with homebrew:
 - `brew install dotnet` 
 - `brew install mysql`
 - `brew install npm`
 
The database schema is under the scripts folder. After installing MySQL, run the script to create the tables necessary.

To run the service run the following from the source directory:
- `dotnet run`
That will start a local web server that you can curl against (or use the browser)
To run the front end, use the following from the ClientApp directory:
- `npm install`
- `npm run build`
- `npm run start`

Example curls:
- get - `curl -k -L -X GET http://localhost:5279/asset`
- create - `curl -k -L -X POST http://localhost:5279/asset -H "Content-Type: application/json" -d '{"TypeId": 2, "Location": "here/hymn1", "EnglishName": "enthoten ze", "CopticName": "ⲛⲓⲣⲱⲙⲓ"}'`
- update - `curl -k -L -X PUT http://localhost:5279/asset -H "Content-Type: application/json" -d '{"TypeId": 2, "Location": "here/hymn2", "EnglishName": "niromi", "CopticName": "ⲛⲓⲣⲱⲙⲓ", "AssetId": 3}'`
    Note: you must supply AssetId for update
- delete - `curl -k -L -X DELETE http://localhost:5279/asset/2`
- tag an asset (tags asset 1 with 2 tags) - `curl -X POST http://localhost:5279/asset/1/tag -H "Content-Type: application/json" -d '[1,2]'`

Contributors:
Athanasius Isaac, Nardin Eshak, Helina Azer, Geovanny Henein, Verena Girgis
