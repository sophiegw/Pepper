import naoqi
from naoqi import ALProxy
import time
from threading import Thread, Event

port = 9559
ip_1 = "192.168.8.105"
ip_2 = "192.168.8.105"
ip_3 = "192.168.8.105"
ip_4 = "192.168.8.105"

#print(behavior_1.getInstalledBehaviors())
#print(RobotPosture_1.getPostureList())

#DEFINE CLASS THREAD
class c_thr(Thread):
#BEGIN Class
    '''Thread de lancement des choregraphies'''
    def __init__(self, ev):
    #BEGIN INIT
        Thread.__init__(self)
        self.event = ev
        self.name = 'A'
        self.port = port
    #END INIT
    def run(self):
    #BEGIN RUN
        self.event.wait()
        print("set %c %d\n" % (self.name, time.time()))
        self.behavior = ALProxy("ALBehaviorManager", self.ip, self.port)
        self.RobotPosture = ALProxy("ALRobotPosture", self.ip, self.port)
        self.speech = ALProxy("ALTextToSpeech", self.ip, self.port)
        '''inserer la choregraphie'''
        self.RobotPosture.goToPosture("Crouch", 0.5)
        self.RobotPosture.goToPosture("StandInit", 0.5)
        self.behavior.runBehavior("elephant/behavior_1")
        #self.speech.say("Bonjour, je suis un elephant !")
    #END RUN
#END Class

ev = Event()
thrd_1 = c_thr(ev)
#thrd_2 = c_thr(ev)
#thrd_3 = c_thr(ev)
#thrd_4 = c_thr(ev)
thrd_1.start()
#thrd_2.start()
#thrd_3.start()
#thrd_4.start()
#thrd_2.name = 'B'
#thrd_3.name = 'C'
#thrd_4.name = 'D'
thrd_1.ip = ip_1
#thrd_2.ip = ip_2
#thrd_3.ip = ip_3
#thrd_4.ip = ip_4
print("before set\n")
ev.set()
print("after set\n")
thrd_1.join()
#thrd_2.join()
#thrd_3.join()
#thrd_4.join()
