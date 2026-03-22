from PIL import Image

def remove_white(input_path, output_path):
    # Open the image and convert it to RGBA
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    
    for item in datas:
        # Getting the R, G, B, A values
        r, g, b, a = item
        
        # Determine how white the pixel is
        # Perfect white is 255, 255, 255
        avg = (r + g + b) / 3
        
        if avg > 240:
            # If it's pure white or very close, make it fully transparent
            if avg > 250:
                new_data.append((255, 255, 255, 0))
            else:
                # Anti-aliasing for edges (smoother transition)
                # Map avg from 240-250 to alpha 255-0
                alpha = int(255 - ((avg - 240) / 10 * 255))
                new_data.append((r, g, b, alpha))
        else:
            # Keep the original pixel
            new_data.append(item)

    # Update image data
    img.putdata(new_data)
    
    # Save the new transparent image
    img.save(output_path, "PNG")

if __name__ == "__main__":
    try:
        remove_white("public/logo.png", "public/logo.png")
        print("Success: White background removed.")
    except Exception as e:
        print(f"Error: {e}")
