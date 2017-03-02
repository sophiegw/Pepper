from naoqi import ALProxy
tts = ALProxy("ALTextToSpeech", "192.168.8.101", 9559)
tts.say("Hello, world!")
