import random
from tkinter import *
import time
root = Tk()
root.minsize(690, 1080)
root.title("Les dates c'est ez pez")
root.config(bg="#6E46FF")
lbl1 = Label(root, text="Les dates c'est chiant", relief=SUNKEN, font="Verdana 25 bold", fg="white", bg="#6E46FF")
lbl1.pack(pady=100)
f1 = Frame(root, width=750, height=25, bg="white")
f1.pack(pady=25)

tab = ["Que se passe t'il en 1787 - 1788 ?", "Que se passe t'il en 1788 ?", "Que se passe t'il le 5 mai 1789", "Que se passe t'il le 14 Juillet 1789", "Que se passe t'il la nuit du 4 au 5 août 1789", "Que se passe t'il les 5 et 6 Octobres 1789", "Que se passe t'il le 21 Juin 1791", "Que se passe t'il en Septembre 1791", "Que se passe t'il le 10 août 1792", "Que se passe t'il le 22 Septembre 1792 ?", "Que se passe t'il le 21 Janvier 1793 ?", "Que se passe t'il du 31 Mai au 2 Juin 1793 ?", "Que se passe t'il du 1793 au 1794 ?", "A partir de 1793 que se passe t'il ?", "Que se passe t'il de 1793 en 1795 ?", "Que se passe t'il le 27 Juillet 1794 ?", "Que se passe t'il de 1795 a 1799 ", "Que se passe t'il les 9 et 10 Novembre 1799", "Que se passe t'il en 1793 ? (concernant les femmes.)", "Quand est ce que les récoltes sont mauvaise et qu'il y a des hausses de taxes ?", "Quand est ce que la République est déclaré ?", "Quand est-ce que le roi tente la fuite ?", "Quand est ce que les commercantes ramène le roi a Paris ?", "Quand est-ce que le Royaume est endétté ?", "Quand est-ce que les privilèges sont abolies ?", "Quand est-ce que la monarchie constitutionnelle est instauré ?", "Quand est-ce que le roi est emprisonné", "Quand est-ce que le roi est guillotiné ?", "Quand est ce que les partisans montagnards ainsi que les sans cullottes arrêtent les grands chefs girondins ?", "Quand se passe la guerre de Vendée ?", "C'est quand les journées de thermidor ?", "C'est quand la fin des clubs féminins", "C'est quand que Napoléon fait son coup d'état", "C'est quand que le Directoire née ?", "C'est quand la prise de la Bastille ?", "C'est quand le serment de paume ?", "C'est quand le rassemblement des états généraux ?", "C'est quand la prise des Tuilleries ?", "C'est quand la levée en masse ?"]

res= StringVar()
entree = Entry(root, width=100)
def callback():
    entree.delete(0, END)
    entree.insert(0, tab[random.randint(0, len(tab))-1])
    
    
btn = Button(root, text="Généré", width=25, height=2, command=callback)
btn.pack(pady=25)

entree.pack(pady=25)
root.mainloop()
