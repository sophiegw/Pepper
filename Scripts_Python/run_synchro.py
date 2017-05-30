import naoqi
import time
from threading import Thread, Event

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
        print("set %c %d\n" % (self.name, time.time()))
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
