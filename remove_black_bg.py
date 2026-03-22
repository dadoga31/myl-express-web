from PIL import Image

def remove_black(input_path, output_path):
    print(f"Removing black background from {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    new_data = []
    
    for item in datas:
        r, g, b, a = item
        # Calculate how bright the pixel is
        brightness = (r + g + b) / 3
        
        if brightness < 8:
            # Pure black or very very dark -> fully transparent
            new_data.append((0, 0, 0, 0))
        elif brightness < 20:
            # Smooth edge transition for dark shadows
            alpha = int(((brightness - 8) / 12) * 255)
            # Keep original color but lower the opacity
            new_data.append((r, g, b, alpha))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Done! Transparent PNG saved.")

if __name__ == "__main__":
    remove_black("public/boxes.png", "public/boxes.png")
