Requests
==
1. one-line string input -> accept only string type, explode it by commas (,) and create and return an array (values)
 - "a,b,c"
 - "100,982,444,990,1"
 - "Mark,Anthony,marka@lib.de"

2. multi-line string input -> explode by NL (\n) to one-line strings, and return a 2 dimensional array (lines, values)
 - "211,22,35
 - 10,20,33"
 - "luxembourg,kennedy,44 budapest,expo ter,5-7 gyors,fo utca,9"
3. if first line is "#useFirstLineAsLabels" then use the next line as labels:
 parse the next line, ignore it from data array, and return it separately as labels array (you may use a value object to represent the result)
```
#useFirstLineAsLabels
Name,Email,Phone
Mark,marc@be.com,998
Noemi,noemi@ac.co.uk,888"
```
Sample return value:
```
{
    labels: [Name, Email, Phone],
    data: [
        [Mark,marc@be.com,998], [Noemi,noemi@ac.co.uk,888]
    ]
}
```
4. if first line starts with "#", parse it as header (settings):
 - format is http query string url encoded:
    - "#useFirstLineAsLabels=[0|1]&columnDelimiter=[.]&lineDelimiter=(.*)"
 - example:
    - \#useFirstLineAsLabels=1&columnDelimiter=,&lineDelimiter=%0A

 - header line must be always delimited by "\n" from the body
 - you can use internal function to parse the string to array
 - use these settings by parsing the input:
    - if "useFirstLineAsLabels" = 1, use it as defined in point 3. -- use the lineDelimiter to parse the input string to lines
    - use the columnDelimiter to parse one line to columns
    - not all the parameters are required, implement default values for all the parameters!
5. if the first line starts with "%", parse header differently
 - format is following: "%[01][0-255]{3}[0-255]{3}"
 - example: "%1044010" (44 is "," 10 is "\n")
 - character map is following:
    - char[1] = useFirstLineAsLabels [1,0]
    - char[2-4] = 3 digit ascii code of columnDelimiter (in case of 78, padded to 078)
    - char[5-7] = 3 digit ascii code of lineDelimiter (in case of 78, padded to 078)
 - this format is strict, all the parameters are required