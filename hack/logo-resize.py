from PIL import Image
import os

def resize_and_compress_png(input_path, output_path=None, size=(96, 96)):
    """
    Resizes a PNG image to a specific dimension (96x96 by default) 
    using the best quality filter.

    Args:
        input_path (str): The path to the original image file.
        output_path (str, optional): The path to save the new resized PNG. 
                                     If None, it uses '[original_name]_96x96.png'.
        size (tuple): The target (width, height) for the image.
    """
    # 1. Load the image
    try:
        # Open and ensure it has an Alpha channel for transparency
        img = Image.open(input_path).convert("RGBA") 
    except FileNotFoundError:
        print(f"Error: Input file not found at {input_path}")
        return
    except Exception as e:
        print(f"An error occurred while opening the image: {e}")
        return

    # 2. Resize the image
    # Use Image.LANCZOS for high-quality downsampling/resampling
    resized_img = img.resize(size, Image.Resampling.LANCZOS)
    
    # 3. Determine the output path
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_{size[0]}x{size[1]}{ext}"
        
    # 4. Save the final image
    # optimize=True helps reduce file size slightly for PNGs
    resized_img.save(output_path, "PNG", optimize=True)
    
    print(f"✅ Success! Resized PNG saved to: {output_path}")
    print(f"Dimensions: {resized_img.size[0]}x{resized_img.size[1]} pixels")

# --- CONFIGURATION (EDIT THESE LINES) ---

# 1. Replace 'your_logo_square.png' with the actual file name of your image
# (If you used the previous script, this will be the square version)
INPUT_FILE = '/Users/romanpeace/workplace/pax-romana-tech/public/blog_logo.png' 

# 2. OPTIONAL: Specify the output file name, or leave as None to use the default
OUTPUT_FILE = 'my_avatar_96.png'
# OUTPUT_FILE = None 

# 3. OPTIONAL: Change the target size if needed
TARGET_SIZE = (96, 96)

# --- RUN THE FUNCTION ---
if __name__ == '__main__':
    resize_and_compress_png(INPUT_FILE, OUTPUT_FILE, TARGET_SIZE)