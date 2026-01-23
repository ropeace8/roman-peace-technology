from PIL import Image
import os

def make_logo_square(input_path, output_path=None):
    """
    Turns a PNG image into a square image by adding transparent padding 
    around the logo, centering it perfectly.
    
    Args:
        input_path (str): The path to the original PNG logo file.
        output_path (str, optional): The path to save the new square PNG. 
                                     If None, it uses '[original_name]_square.png'.
    """
    # 1. Load the image
    try:
        img = Image.open(input_path).convert("RGBA")
    except FileNotFoundError:
        print(f"Error: Input file not found at {input_path}")
        return
    except Exception as e:
        print(f"An error occurred while opening the image: {e}")
        return

    # Get the original dimensions
    width, height = img.size
    
    # 2. Determine the size of the square canvas
    # The new square side length will be the larger of the current width or height
    new_side = min(width, height)
    
    # 3. Create a new transparent square image
    # The (0, 0, 0, 0) color tuple represents fully transparent black (R, G, B, Alpha)
    square_img = Image.new('RGBA', (new_side, new_side), (0, 0, 0, 0))
    
    # 4. Calculate the paste position to center the original image
    # x_offset = (new_side - width) / 2
    # y_offset = (new_side - height) / 2
    x_offset = int((new_side - width) / 2)
    y_offset = int((new_side - height) / 2)
    
    # 5. Paste the original image onto the square canvas
    square_img.paste(img, (x_offset, y_offset), img)

    # 6. Determine the output path
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_square{ext}"
        
    # 7. Save the final image
    # Use save_all=True for multi-frame images (like animated PNGs)
    # The original PNG should already handle transparency correctly
    square_img.save(output_path, "PNG", save_all=True)
    print(f"✅ Success! Your square logo is saved to: {output_path}")

# --- CONFIGURATION (EDIT THESE LINES) ---

# 1. Replace 'your_logo.png' with the actual file name of your logo
INPUT_FILE = '/Users/romanpeace/workplace/pax-romana-tech/public/blog-logo.png'

# 2. OPTIONAL: Specify the output file name, or leave as None to use the default
# OUTPUT_FILE = 'my_new_square_logo.png'
OUTPUT_FILE = "new_square_logo.png" 

# --- RUN THE FUNCTION ---
if __name__ == '__main__':
    make_logo_square(INPUT_FILE, OUTPUT_FILE)