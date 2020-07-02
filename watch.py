#!/usr/bin/python3

from playsound import playsound
import subprocess
import time

while True:
  print("Running a test...")
  p = subprocess.Popen(["make", "test-in-docker"], stderr=subprocess.STDOUT)
  if p.wait() != 0:
    playsound("short-alarm.mp3")
  print("Will rerun in 60 seconds...")
  time.sleep(60)

