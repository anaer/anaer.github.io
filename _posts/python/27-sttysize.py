#!/usr/bin/python
import commands
def get_terminal_width():
    cols = commands.getoutput("tput cols")
    print "terminal'width for command 'tput cols':" + cols
def get_terminal_width_1():
    terminal_size= commands.getoutput("stty size").split()
    print "terminal'width for command 'stty size':" + terminal_size[1]

get_terminal_width()
get_terminal_width_1()
