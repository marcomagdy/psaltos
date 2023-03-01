# Ⲡⲥⲁⲗⲧⲟⲥ (Psaltos)
Coptic Hymns Reference Project

# Build instructions

A few dependencies are needed:
 - .NET core SDK
 - MySQL installation
 
 To install on a macOS with homebrew:
 - `brew install dotnet` 
 - `brew install mysql`
 
The database schema is under the scripts folder. After installing MySQL, run the script to create the tables necessary.

To run the service run the following from the source directory:
- `dotnet run`
That will start a local web server that you can curl against (or use the browser)

Example curls:
- get - `curl -X GET http://localhost:5213/asset`
- create - `curl -X POST http://localhost:5213/asset -H "Content-Type: application/json" -d '{"TypeId": 2, "Location": "here/hymn1", "EnglishName": "enthoten ze", "CopticName": "ⲛⲓⲣⲱⲙⲓ"}'`
- update - `curl -X PUT http://localhost:5213/asset -H "Content-Type: application/json" -d '{"TypeId": 2, "Location": "here/hymn2", "EnglishName": "niromi", "CopticName": "ⲛⲓⲣⲱⲙ", "AssetId": 3}'`
    Note: you must supply AssetId for update
- delete - `curl -X DELETE http://localhost:5213/asset/2`

Contributors:
Athanasius Isaac, Nardin Eshak, Helina Azer
