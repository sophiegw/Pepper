import os
import time
import naoqi
from naoqi import ALProxy


### Infos pratiques:


# Python/Naoqi "install guide"
# http://doc.aldebaran.com/2-5/dev/python/install_guide.html


# Naoqi Download link:
# https://community.ald.softbankrobotics.com/en/resources/software/language/en-gb


## Doc AlBehaviorManager (très certainement le module qui nous intéresse pour lancer un projet déjà upload sur le robot)
# http://doc.aldebaran.com/2-5/naoqi/core/albehaviormanager.html



###### NB: Pour lancer ce script il faut désactiver la vie autonome du robot
# (le switch behavior ne se fera pas sinon, le speech devrait se faire tout de même en attendant pour les tests simple)
# 			"Double-clic" sur le bouton torse du robot => le robot se couche



### Optionnel:

# Pour ajouter un nouveau behavior, "le plus simple(visuel)":
#	Installer Choregraphe ("Pepper Software Suite 2.5.5")
#	Il demandera la clé license: 654e-4564-153c-6518-2f44-7562-206e-4c60-5f47-5f45
# 	Creer une application avec les boites, l'upload sur le robot
#		Clic droit dans la liste des applis pour connaitre son ID


# Ip du Robot (pour la connaitre; appuyer sur le bouton sur le torse derriere la tablette)
ip = '192.168.8.105'
port = 9559

# Module de gestion de la parole
speech = ALProxy("ALTextToSpeech",ip,port)
# Module de gestion des projets
behavior = ALProxy("ALBehaviorManager",ip,port)



# On fait juste dire coucou
speech.say("Coucou")

# Normalement; le behavior(projet) que j'avais rajouter avec cet ID
behavior.runBehavior("elephant")


## Si le behavior n'est pas reconnu on peut essayer de chercher la liste des installés:
# print(behavior.getInstalledBehaviors())
