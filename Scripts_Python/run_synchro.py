#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import naoqi
from naoqi import ALProxy
import time
from threading import Thread, Event

port = 9559

#DEFINE CLASS THREAD
class c_thr(Thread):
#BEGIN Class
    '''Thread de lancement des choregraphies'''
    def __init__(self, ev):
    #BEGIN INIT
        Thread.__init__(self)
        self.name = "Default"
        self.event = ev
        self.connected = False
        self.port = port
    #END INIT
    def run(self):
    #BEGIN RUN
        try: #CHECK CONNECTION
            self.AutonomousLife = ALProxy("ALAutonomousLife", self.ip, self.port)
            self.behavior = ALProxy("ALBehaviorManager", self.ip, self.port)
            self.RobotPosture = ALProxy("ALRobotPosture", self.ip, self.port)
            self.speech = ALProxy("ALTextToSpeech", self.ip, self.port)
            self.connected = True
            print "Connection to " + self.ip + " Completed\n"
        except:
            self.connected = False
            print "Connection to " + self.ip + " Failed\n"
            sys.exit()
        self.event.wait()
        '''inserer la choregraphie'''
        #self.RobotPosture.goToPosture("Crouch", 0.5)
        #self.RobotPosture.goToPosture("StandZero", 0.5)
        #self.RobotPosture.goToPosture("StandInit", 0.5)
        #tosay = "Bonjour, je suis" + self.name
        #self.speech.say(tosay)

        ### UNCOMMENT THE FONCTION YOU WANT TO USE BELOW:

        # self.dancing()
        # self.stop()
        # self.reset()
    def dancing(self):
        self.behavior.runBehavior("techweek/behavior_1")

    def stop(self):
        if (self.behavior.isBehaviorRunning("techweek/behavior_1")):
            self.behavior.stopBehavior("techweek/behavior_1")

    def reset(self):
        self.stop()
        if self.AutonomousLife.getState() != "disabled":
            self.AutonomousLife.setState("disabled")
        if self.RobotPosture.getPosture() != "Crouch":
            self.RobotPosture.goToPosture("Crouch", 0.5)

    #END RUN
#END Class
def get_on_all(seq, method, *args, **kwargs):
    if isinstance(seq, list):
        for obj in seq:
             getattr(obj, method)(*args, **kwargs)
    else:
        getattr(seq, method)(*args, **kwargs)

def set_on_all(seq, attribute, values):
    # for index, obj in range(0, len(seq)):
    if isinstance(seq, list):
        for index, obj in enumerate(seq):
            setattr(obj, attribute, values[index])
    else:
        setattr(seq, attribute, values[0])

ev = Event()
thrd_1 = c_thr(ev)
thrd_2 = c_thr(ev)
thrd_3 = c_thr(ev)
thrd_4 = c_thr(ev)

allThreads = [thrd_1, thrd_2, thrd_3, thrd_4]
thrds = allThreads[1:4] #Beware: Last element not included
names = ["Superman","GrineLanterne","FlashGordone","Batman"]
ips = ["192.168.8.105","192.168.8.112", "192.168.8.101", "192.168.8.115"]

set_on_all(thrds, "name", names)
set_on_all(thrds, "ip", ips)
# for index, x in enumerate(thrds):
#     x.name = names[index]
get_on_all(thrds,"start")


time.sleep(2)

## Need "proper and clean" trick to allow for single element (which is not iterable)
for x in thrds:
    print x.name + " " + str(x.connected) + "\n"



allConnected = True
for thrd in thrds:
    if thrd.connected == False :
        allConnected = False

if (allConnected):
    print "All connected"
    ev.set()
    print "Event sent"
    get_on_all(thrds, "join")

else:
    print("Not connected")
    sys.exit()