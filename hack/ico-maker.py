from PIL import Image
import os

def convert_png_to_ico(input_path, output_path=None, sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]):
    """
    Converts a PNG image to a multi-size ICO file.

    Args:
        input_path (str): The path to the PNG image file (ideally square).
        output_path (str, optional): The path to save the new ICO file. 
                                     If None, it uses '[original_name].ico'.
        sizes (list of tuples): A list of (width, height) tuples for the 
                                different icon sizes to include in the ICO file.
    """
    # 1. Determine the output path
    if output_path is None:
        base, _ = os.path.splitext(input_path)
        output_path = f"{base}.ico"
        
    # 2. Load the image
    try:
        # Open the image. The ICO format supports transparency, so RGBA is needed.
        img = Image.open(input_path).convert("RGBA") 
    except FileNotFoundError:
        print(f"Error: Input file not found at {input_path}")
        return
    except Exception as e:
        print(f"An error occurred while opening the image: {e}")
        return

    # 3. Save as ICO with multiple sizes
    try:
        # Pillow's save method handles the resizing and packaging 
        # of multiple images into the single ICO file automatically.
        img.save(output_path, 
                 format='ICO', 
                 sizes=sizes)
        
        print(f"✅ Success! Multi-size ICO file saved to: {output_path}")
        print(f"The ICO file contains the following sizes: {', '.join([f'{w}x{h}' for w, h in sizes])}")
        
    except Exception as e:
        print(f"An error occurred while saving the ICO file: {e}")

# --- CONFIGURATION (EDIT THESE LINES) ---

# 1. Use the square PNG you created earlier (e.g., 96x96 or the initial square padded one)
INPUT_FILE = '/Users/romanpeace/workplace/pax-romana-tech/public/blog_icon.png' 

# 2. OPTIONAL: Specify the output file name, or leave as None to use the default
OUTPUT_FILE = 'favicon.ico'
# OUTPUT_FILE = None 

# --- RUN THE FUNCTION ---
if __name__ == '__main__':
    convert_png_to_ico(INPUT_FILE, OUTPUT_FILE)