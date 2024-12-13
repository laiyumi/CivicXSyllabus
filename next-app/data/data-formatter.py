import csv
import json

# import the csv file
with open('raw-data.csv', 'r') as file:
    reader = csv.reader(file)

    next(reader, None) # skip the header row
    
    json_data = []
    
    for row in reader:
        # split the tags and categories into a list
        tags = row[8].split(',')
        categories = row[9].split(',')

        # remove any leading or trailing white spaces
        tags = [tag.strip() for tag in tags]
        categories = [category.strip() for category in categories]
        content = row[11].strip()
        excerpt = row[10].strip()
        title = row[4].strip()
        link = row[5].strip()
        imageUrl = row[12].strip()
        source = row[7].strip()

        json_data.append({
            'title': title,
            'link': link,
            'source': source,
            'tags': tags,
            'categories': categories,
            'excerpt': excerpt,
            'content': content,
            'imageUrl': imageUrl
        })

# write the json data to a file
with open('formatted_data.json', 'w') as file:
    json.dump(json_data, file, indent=4)

