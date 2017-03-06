import time

from naoqi import ALProxy
IP="192.168.8.101"
tts = ALProxy("ALTextToSpeech", IP, 9559)
listening = ALProxy("ALSpeechRecognition", IP, 9559)
speech = ALProxy("ALMemory",IP, 9559)
tts.say("Hello")
time.sleep(1)
i = 1
while 1:
	time.sleep(1)
	listening.subscribe("testsay")
	extractedtext = speech.getData("WordRecognized")
	print("coucou {0}".format(extractedtext))
	i=i+1
print i
