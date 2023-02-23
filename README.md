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

Contributors:
Athanasius Isaac