from __future__ import print_function
import naoqi
import os
import time
from threading import Thread, Event
from naoqi import ALProxy

port = 9559
ip_1 = "192.168.8.105"
behavior_1 = ALProxy("ALBehaviorManager", ip_1, port)
RobotPosture_1 = ALProxy("ALRobotPosture", ip_1, port)
ip_2 = "192.168.8.105"
behavior_2 = ALProxy("ALBehaviorManager", ip_2, port)
RobotPosture_1 = ALProxy("ALRobotPosture", ip_2, port)
ip_3 = "192.168.8.105"
behavior_3 = ALProxy("ALBehaviorManager", ip_3, port)
RobotPosture_3 = ALProxy("ALRobotPosture", ip_3, port)
ip_4 = "192.168.8.105"
behavior_4 = ALProxy("ALBehaviorManager", ip_4, port)
RobotPosture_4 = ALProxy("ALRobotPosture", ip_4, port)


class c_thr(Thread):
#BEGIN Class
    '''Thread de lancement dune action'''
    def __init__(self, ev):
    #BEGIN INIT
        Thread.__init__(self)
        self.event = ev
        self.name = 'A'
    #END INIT
    def run(self):
    #BEGIN RUN
        self.event.wait()
        '''action run prog peeper'''
        print("set %c %d\n" % (self.name, (float)(time.time()) + (float)(time.time()) * 0.000001))
    #END RUN
#END Class

ev = Event()
thrd_1 = c_thr(ev)
thrd_1.start()
thrd_2 = c_thr(ev)
thrd_2.name = 'B'
thrd_2.start()
print("before set\n")
ev.set()
print("after set\n")
thrd_1.join()
thrd_2.join()
#print(behavior.getInstalledBehaviors())
#print(RobotPosture.getPostureList())
RobotPosture.goToPosture("StandInit", 0.5)
behavior.runBehavior("elephant/behavior_1")
