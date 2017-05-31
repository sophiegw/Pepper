import naoqi
from naoqi import ALProxy
import time
from threading import Thread, Event

msg = "CONNECT ERROR"
port = 9559
ip_1 = "192.168.8.105"
ip_2 = "192.168.8.101"
ip_3 = "192.168.8.105"
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
    #END INIT
    def run(self):
    #BEGIN RUN
        try: #CHECK CONNECTION
            self.behavior = ALProxy("ALBehaviorManager", self.ip, self.port)
            self.RobotPosture = ALProxy("ALRobotPosture", self.ip, self.port)
            self.speech = ALProxy("ALTextToSpeech", self.ip, self.port)
            self.connected = True
        except:
            self.connected = False
            self.name = msg
            exit()
        #CHOREGRAPHIE
        self.event.wait()
        self.RobotPosture.goToPosture("Crouch", 0.5)
        self.RobotPosture.goToPosture("StandInit", 0.5)
        #self.RobotPosture.goToPosture("StandInit", 0.5)
        #self.behavior.runBehavior("elephant/behavior_1")
        #self.speech.say("Bonjour, je suis un elephant !")
    #END RUN
#END Class
ev = Event()
thrd_1 = c_thr(ev)
thrd_2 = c_thr(ev)
thrd_3 = c_thr(ev)
thrd_4 = c_thr(ev)
thrd_2.name = 'B'
thrd_3.name = 'C'
thrd_4.name = 'D'
thrd_1.ip = ip_1
thrd_2.ip = ip_2
thrd_3.ip = ip_3
thrd_4.ip = ip_4
thrd_1.start()
thrd_2.start()
thrd_3.start()
thrd_4.start()
if (thrd_1.connected == True and thrd_2.connected == True and thrd_3.connected == True and thrd_4.connected == True):
    ev.set()
    thrd_1.join()
    thrd_2.join()
    thrd_3.join()
    thrd_4.join()
