from luma.core.interface.serial import spi, noop
from luma.core.render import canvas
from gpiozero import Button
import requests
import time
import sys
import json
from luma.core.legacy import text, show_message
from luma.core.legacy.font import proportional, LCD_FONT, CP437_FONT, TINY_FONT, SINCLAIR_FONT
from luma.core.virtual import viewport
from luma.led_matrix.device import max7219
data=json.loads(sys.argv[1])
device_in=sys.argv[2]
device_out=sys.argv[3]
in_count=data[device_in]
out_count=data[device_out]
serial =spi(port=0, device=0, gpio=noop())
device = max7219(serial, cascaded=4, rotate=0, block_orientation=-90, blocks_arranged_in_reverse_order=False)
resetButton=Button(2,hold_time=3)
def resetCount():
	print('RESET')
	headers={'Content-Type':'application/json'}
	response=requests.get('http://localhost:8080/api/v1/POS/hikvision/resetCache',headers=headers)
	print(response.text)

def main():
	count=f"{abs(in_count-out_count)}"
	
	while True:
		resetButton.when_held=resetCount
		with canvas(device) as draw:
			text(draw, (0,0), count, fill="white", font=proportional(CP437_FONT))
		#show_message(device,count,fill="white",font=proportional(SINCLAIR_FONT),scroll_delay=0.1)
							       	               							       	               			
try:	
	main()
except Exception as e:
	print(f"Error Occured: {e}")
	
