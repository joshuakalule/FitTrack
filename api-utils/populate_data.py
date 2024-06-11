from urllib import request
from googleapiclient.discovery import HttpError, build
import json
import csv

API_KEY = 'AIzaSyCpk9XXVmdL-O5ghhcA8Sd7fyucY-7dIL8'

# service = build('youtube', 'v3', developerKey=API_KEY)

# request = service.playlistItems().list(
#     part="snippet,contentDetails",
#     maxResults=30,
#     playlistId="PLRS2DE4P39EdA_gtx32NL2WeIu_94rzqt"
# )
# data = dict()
# try:
#     response = request.execute()
#     with open('D:\\Documents\\Alx\\data.json', 'w') as fp:
#         json.dump(response, fp, sort_keys=True, indent=4)
#         data = response
#         # print(json.dumps(response, sort_keys=True, indent=4))
# except HttpError as e:
#     print('Error response status code : {0}, reason : {1}'.format(e.status_code, e.error_details))

# service.close()

def get_playlist():
    with open('data.json', 'r') as fp:
        data = json.load(fp)
    return data

def clean_description(text):
    exclude = ['http://']
    clean_text = ""
    for n, line in enumerate(text.split('\n\n')):
        if any([x.lower() in line.lower() for x in exclude]):
            continue
        clean_text += line + '\n\n'
    # print(clean_text)
    return clean_text


# Open a new CSV file for writing
with open('workouts.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    # Write the header row
    writer.writerow(['Title', 'workout_day', 'YouTube Video Title', 'YouTube Video URL', 'Description'])

    data = get_playlist()
    for item in data.get('items'):
        title = item['snippet'].get('title')
        description = item['snippet'].get('description')
        thumnnail_url = item['snippet']['thumbnails']['default'].get('url')
        thumbnail_width = item['snippet']['thumbnails']['default'].get('width')
        thumbnail_height = item['snippet']['thumbnails']['default'].get('height')
        video_id = item['contentDetails'].get('videoId')
        writer.writerow([title, thumnnail_url, thumbnail_width, thumbnail_height, video_id, clean_description(description)])

print("CSV file has been created with workout data.")
