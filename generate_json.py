import os
import json

# Define the images directory
images_dir = "images"

# Scan the directory for character folders
characters = []
for character in os.listdir(images_dir):
    character_path = os.path.join(images_dir, character)
    if os.path.isdir(character_path):  # Ensure it's a folder
        images = [f for f in os.listdir(character_path) if f.endswith('.png')]
        characters.append({
            "name": character,
            "thumbnail": f"{images_dir}/{character}/thumbnail.png",
            "images": [f"{images_dir}/{character}/{img}" for img in images if img != "thumbnail.png"]
        })

# Save the data to a JSON file
with open("characters.json", "w") as json_file:
    json.dump({"characters": characters}, json_file, indent=4)

print("✅ characters.json updated successfully!")