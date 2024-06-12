import time

import board
import busio
from digitalio import DigitalInOut
from adafruit_pn532.spi import PN532_SPI
import ndef
import logging

START_BLOCK = 4

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s',
                    filename='/home/binderdezso/startup/nfc_project/board/logs/writeTag.log', filemode='a')


def initialize_pn532_connection():
    logging.info("Initializing connection to PN532")
    spi = busio.SPI(board.SCK, board.MOSI, board.MISO)
    cs_pin = DigitalInOut(board.D5)
    pn532 = PN532_SPI(spi, cs_pin, debug=False)
    return spi, cs_pin, pn532


def insert_correct_bytes(starting_letter):
    incorrect_byte = b'\x00' + starting_letter
    logging.info(f"Correcting faulty byte {incorrect_byte} in block #5")
    correct_byte = b'\x04' + starting_letter
    return pn532.ntag2xx_read_block(5).replace(incorrect_byte, correct_byte)


def get_str_len_in_hex(str):
    # +5 => for implied 'www.'(4 bytes) and +1 byte for terminator/length byte
    len_hex = hex(len(str) + 5)[2:]
    logging.info(f"Initial hex value: {len_hex}")
    # If the hex string has an odd number of characters, prepend a '0'
    if len(len_hex) % 2 != 0:
        logging.info(f"Initial hex value: {len_hex}, prepending a 0 was required")
        len_hex = '0' + len_hex
    return len_hex


def create_encoded_message(url, url_len_hex):
    logging.info("Creating URI Record")
    uri_record = ndef.UriRecord(url)
    ndef_message = [uri_record]
    logging.info("Encoding url into bytes")
    encoded_message = b'\x03' + bytes.fromhex(url_len_hex) + b''.join(ndef.message_encoder(ndef_message)) + b'\xfe'
    return encoded_message


def write_blocks(msg_blocks):
    logging.info("Writing blocks to NTAG")

    total_blocks = 0
    for i, block in enumerate(msg_blocks):
        block_number = START_BLOCK + i
        pn532.ntag2xx_write_block(block_number, block)
        total_blocks += 1
    logging.info(f"Finished writing a total of {total_blocks}")


def correct_faulty_block(block_num, url):
    pn532.ntag2xx_write_block(block_num, insert_correct_bytes(url[0].encode()))


def pad_encoded_msg(msg):
    logging.info(f"Padding message '{msg}' is needed to achieve a total of 4 bytes")
    msg += b'\x00' * (4 - len(msg) % 4)
    return msg


def partition_msg_into_fours(msg):
    logging.info("Splitting message into blocks of 4")
    return [msg[i:i + 4] for i in range(0, len(msg), 4)]


def wait_for_tag():
    logging.info("Waiting for RFID/NFC card...")
    while True:
        uid = pn532.read_passive_target(timeout=0.5)
        if uid is None:
            continue
        return uid


if __name__ == "__main__":
    spi, cs_pin, pn532 = initialize_pn532_connection()
    ic, ver, rev, support = pn532.firmware_version
    logging.info("Found PN532 with firmware version: {0}.{1}".format(ver, rev))

    while True:
        card_uid = wait_for_tag()
        logging.info("Found card with UID: {}".format(card_uid.hex()))

        pet_uid = input("Provide PET_UID: ")

        if pet_uid == '0':
            logging.info("Powering down PN532 and exiting application")
            pn532.power_down()
            break

        url = 'fordogs.hu/' + pet_uid
        url_len_hex = get_str_len_in_hex(url)

        padded_msg = pad_encoded_msg(create_encoded_message(url, url_len_hex))
        msg_blocks = partition_msg_into_fours(padded_msg)

        write_blocks(msg_blocks)
        correct_faulty_block(5, url)

        logging.info("NDEF message is written successfully!")

        time.sleep(5)
