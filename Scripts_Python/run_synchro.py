#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import naoqi
from naoqi import ALProxy
import time
from threading import Thread, Event

port = 9559
ip_1 = "192.168.8.101"
ip_2 = "192.168.8.105"
ip_3 = "192.168.8.112"
ip_4 = "192.168.8.105"

#DEFINE CLASS THREAD
class c_thr(Thread):
#BEGIN Class
    '''Thread de lancement des choregraphies'''
    def __init__(self, ev):
    #BEGIN INIT
        Thread.__init__(self)
        self.event = ev
        self.connected = False
        self.port = port
        self.connected = False
    #END INIT
    def run(self):
    #BEGIN RUN
        try: #CHECK CONNECTION
            self.behavior = ALProxy("ALBehaviorManager", self.ip, self.port)
            self.RobotPosture = ALProxy("ALRobotPosture", self.ip, self.port)
            self.speech = ALProxy("ALTextToSpeech", self.ip, self.port)
            self.connected = True
            print("Connection Completed\n")
        except:
            self.connected = False
            print("Connection Failed\n")
            sys.exit()
        self.event.wait()
        '''inserer la choregraphie'''
        #self.RobotPosture.goToPosture("Crouch", 0.5)
        #self.RobotPosture.goToPosture("StandZero", 0.5)
        #self.RobotPosture.goToPosture("StandInit", 0.5)
        #self.behavior.runBehavior("elephant/behavior_1")
        tosay = "Bonjour, je suis" + self.name
        self.speech.say(tosay)
    def stop(self):
        sys.exit()
    #END RUN
#END Class
ev = Event()
thrd_1 = c_thr(ev)
thrd_2 = c_thr(ev)
thrd_3 = c_thr(ev)
#thrd_4 = c_thr(ev)
thrd_1.name = "Superman"
thrd_2.name = "GrineLanterne"
thrd_3.name = "FlashGordone"
#thrd_4.name = 'D'
thrd_1.ip = ip_1
thrd_2.ip = ip_2
thrd_3.ip = ip_3
#thrd_4.ip = ip_4
thrd_1.start()
thrd_2.start()
thrd_3.start()
#thrd_4.start()
print("1", thrd_1.connected)
print("2", thrd_2.connected)
print("3", thrd_3.connected)

#time.sleep(3)
if (thrd_1.connected == True and thrd_2.connected == True and thrd_3.connected == True):
    ev.set()
    print("after set\n")
    thrd_1.join()
    thrd_2.join()
    thrd_3.join()
    thrd_4.join()