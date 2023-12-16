from machine import I2C, Pin, Timer
from time import sleep
import ssd1306
import bme280
import time

i2c = I2C(0, scl=Pin(22), sda=Pin(21))
#bme = bme280.BME280(i2c=i2c, address=0x76)

oled_width = 128
oled_height = 64
oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c, addr=0x3c)

# Abre el archivo CSV en modo de anexar ('a')
with open('datos_bme.csv', 'w') as archivo_csv:
    archivo_csv.write('Tiempo,Temperatura[Humedad,Presión[HPa]\n')

def read_sensor_isr(event):
    temp = 29.6 #bme.temperature
    hum = 75.1 #bme.humidity
    pres = 1013 #bme.pressure

    oled.text("{:.2f}".format(temp), 50, 10)
    oled.text("{:.2f}".format(hum), 50, 20)
    oled.text("{}".format(pres), 50, 30)
    oled.show()

    # Abre el archivo CSV en modo de anexar ('a')
    with open('datos_bme.csv', 'a') as archivo_csv:
        # Obtiene el tiempo actual en segundos
        tiempo_actual = time.time()
        # Escribe los datos en el archivo CSV
        archivo_csv.write(f'{tiempo_actual},{temp},{hum},{pres}\n')

blink_timer = Timer(1)
blink_timer.init(period=1000, mode=Timer.PERIODIC, callback=read_sensor_isr)

oled.text("Sensor BME", 0, 0)
oled.text("Temp:        C", 0, 10)
oled.text("Hume:        %", 0, 20)
oled.text("Pres:        HPa", 0, 30)
oled.show()
