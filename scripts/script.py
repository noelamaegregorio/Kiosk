import sys
from escpos.printer import Win32Raw
import qrcode
from PIL import Image
import random
import string

def main():
    # print("Python script executed successfully!")
    if len(sys.argv) > 1:
        printer_name = "POS58 Printer" 
        random_data = sys.argv[1]

        # Generate QR code
        qr = qrcode.make(random_data)
        qr.save("qr_code.png")

        # Connect to Windows-installed printer
        printer = Win32Raw(printer_name)
        printer.image("qr_code.png")
        printer.text("\n")
        printer.cut()

    

if __name__ == "__main__":
    main()
