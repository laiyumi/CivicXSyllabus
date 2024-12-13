import csv
import json

# import the csv file
with open('resources-to-be-upload.csv', 'r') as file:
    reader = csv.reader(file)

    next(reader, None) # skip the header row
    
    json_data = []
    
    for row in reader:
        tags = row[8].split(',')
        categories = row[9].split(',')

        json_data.append({
            'title': row[4],
            'link': row[5],
            'source': row[7],
            'tags': tags,
            'category': categories,
            'excerpt': row[10],
            'content': row[11],
            'imageUrl': row[12]
        })

# write the json data to a file
with open('formatted_resources.json', 'w') as file:
    json.dump(json_data, file, indent=4)

