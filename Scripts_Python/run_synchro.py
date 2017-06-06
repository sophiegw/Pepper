#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import naoqi
from naoqi import ALProxy
import time
from threading import Thread, Event

PORT = 9559
allConnected = True
names = ["Superman","GrineLanterne","FlashGordone","Batman"]
ips = ["192.168.8.105","192.168.8.101", "192.168.8.112", "192.168.8.115"]
#/!\ IP PLUS BAS

class c_thr(Thread):
#BEGIN Class
    def __init__(self):
    #BEGIN INIT
        Thread.__init__(self)
        self.name = "Default"
        self.connected = False
        self.port = PORT
        self.ip = 0
        #self.allConnected = allConnected
    #END INIT
    def dancing(self):
        self.behavior.runBehavior("techweek/behavior_1")
    def stop(self):
    #BEGIN STOP
        if (self.behavior.isBehaviorRunning("techweek/behavior_1")):
            self.behavior.stopBehavior("techweek/behavior_1")
    #END STOP
    def reset(self):
    #BEGIN RESET
        self.stop()
        if self.AutonomousLife.getState() != "disabled":
            self.AutonomousLife.setState("disabled")
        self.Motion.rest()
    #END RESET
    def run(self):
    #BEGIN RUN
        try: #CHECK CONNECTION
        #BEGIN TRY
            self.AutonomousLife = ALProxy("ALAutonomousLife", self.ip, self.port)
            self.behavior = ALProxy("ALBehaviorManager", self.ip, self.port)
            self.RobotPosture = ALProxy("ALRobotPosture", self.ip, self.port)
            self.speech = ALProxy("ALTextToSpeech", self.ip, self.port)
            self.Motion = ALProxy("ALMotion", self.ip, self.port)
            self.connected = True
            print "Connection to " + self.ip + " Completed on " + self.name + ".\n"
        #END TRY
        except:
        #BEGIN EXCEPT
            self.connected = False
            print "Connection to " + self.ip + " Failed on " + self.name + ".\n"
        #END EXCEPT
        ev.wait()
        if (self.allConnected == True):
        #BEGIN CHOREGRAPHIE
            '''INSERT CHOREGRAPHIE (uncomment for play)'''
            #self.RobotPosture.goToPosture("Crouch", 0.5)
            #self.RobotPosture.goToPosture("StandZero", 0.5)
            #self.RobotPosture.goToPosture("StandInit", 0.5)
            #tosay = "Bonjour, je suis" + self.name
            #self.speech.say(tosay)
            self.stop()
            self.dancing()
            self.reset()
        #END CHOREGRAPHIE
    #END RUN
#END Class

def get_on_all(seq, method, *args, **kwargs):
#BEGIN START NETHOD IN >= 1 OBJ
    if isinstance(seq, list):
        for obj in seq:
             getattr(obj, method)(*args, **kwargs)
    else:
        getattr(seq, method)(*args, **kwargs)
#END GET_ON_ALL

def set_on_all(seq, attribute, values):
#BEGIN CHANGE VAR IN >= 1 OBJ
    if isinstance(seq, list):
        for index, obj in enumerate(seq):
            setattr(obj, attribute, values[index])
    else:
        setattr(seq, attribute, values[0])
#END set_on_all


#DEL IN FINAL VERSION
ips = ["192.168.8.101","192.168.8.1105", "192.168.8.112", "192.168.8.115"]


ev = Event()
thrd_1 = c_thr()
thrd_2 = c_thr()
thrd_3 = c_thr()
thrd_4 = c_thr()
allThreads = [thrd_1, thrd_2, thrd_3, thrd_4]
thrds = allThreads[1:2] #Beware: Last element not included
set_on_all(thrds, "name", names)
set_on_all(thrds, "ip", ips)
get_on_all(thrds,"start")
time.sleep(1)
for x in thrds:
#BEGIN EACH THREADS
    if x.connected == False:
        allConnected = False
#END EACH THREADS
for x in thrds:
    x.allConnected = allConnected
if (allConnected == True):
#BEGIN EVENT
    print "All connected."
    ev.set()
    print "Event sent.\nChoreography in progress..."
    get_on_all(thrds, "join")
    print("END")
#END EVENT
else:
#BEGIN KILL THREADS
    ev.set()
    print("Not all connected.\n")
    print("END")
#END
