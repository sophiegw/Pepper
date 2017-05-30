import naoqi
from naoqi import ALProxy
import time
from threading import Thread, Event

port = 9559
ip_1 = "192.168.8.105"
ip_2 = "192.168.8.105"
ip_3 = "192.168.8.105"
ip_4 = "192.168.8.105"
behavior_1 = ALProxy("ALBehaviorManager", ip_1, port)
behavior_2 = ALProxy("ALBehaviorManager", ip_2, port)
behavior_3 = ALProxy("ALBehaviorManager", ip_3, port)
behavior_4 = ALProxy("ALBehaviorManager", ip_4, port)
RobotPosture_1 = ALProxy("ALRobotPosture", ip_1, port)
RobotPosture_1 = ALProxy("ALRobotPosture", ip_2, port)
RobotPosture_3 = ALProxy("ALRobotPosture", ip_3, port)
RobotPosture_4 = ALProxy("ALRobotPosture", ip_4, port)

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
    #END INIT
    def run(self):
    #BEGIN RUN
        self.event.wait()
        '''inserer la choregraphie'''
        print("set %c %d\n" % (self.name, time.time()))
    #END RUN
#END Class

ev = Event()
thrd_1 = c_thr(ev)
thrd_2 = c_thr(ev)
thrd_3 = c_thr(ev)
thrd_4 = c_thr(ev)
thrd_1.start()
thrd_2.start()
thrd_3.start()
thrd_4.start()
thrd_2.name = 'B'
thrd_3.name = 'C'
thrd_4.name = 'D'
print("before set\n")
ev.set()
print("after set\n")
thrd_1.join()
thrd_2.join()
thrd_3.join()
thrd_4.join()
#RobotPosture_1.goToPosture("Crouch", 0.5)
#RobotPosture_1.goToPosture("StandInit", 0.5)
#behavior_1.runBehavior("elephant/behavior_1")
