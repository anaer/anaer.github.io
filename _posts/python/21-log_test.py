#!/usr/bin/env python
#-*-coding:utf-8-*-
#Filename:
import os
import sys
import errno
import logging
import logging.handlers
import traceback

__author__ = "maqiang.jacky <mq.jacky@gmail.com>"
__version__ = 1.0
__date__ = "11-4-2"

try:
    from config.config import conf
except ImportError:
    conf = {}
    conf["logger"] = {}
    conf["logger"]["path"] = "%s%slogs" % (os.path.dirname(os.path.realpath(__file__)), os.sep)
    conf["logger"]["format"] = "%(asctime)s>>(PID:%(process)d,FUNCNAME:%(funcName)s,LINENO:%(lineno)d)-%(levelname)s-%(message)s"
    conf["logger"]["backupcount"] = 7
    conf["logger"]["level"]=logging.DEBUG
except :
    raise

class logger():
    """
    """
    Ins = None

    @staticmethod
    def getLogger(modname):
        """
        """
        if None == logger.Ins:
            logger.Ins = InitLogging(modname)
        return logger.Ins

def InitLogging(modname):
    """
    """
    logger = logging.getLogger(modname)
    format = logging.Formatter(conf["logger"]["format"])

    logpath = conf["logger"]["path"]
    try:
        os.makedirs(logpath)
    except OSError,e:
        if e.errno != errno.EEXIST:
            print "logger make dir error:",e
            raise

    logfile = os.path.join(logpath, "%s.log" % modname)
    handler = logging.handlers.TimedRotatingFileHandler(filename = logfile
                                                        , when = "D"
                                                        , backupCount = conf["logger"]["backupcount"])
    handler.setFormatter(format)
    logger.addHandler(handler)
    logger.setLevel(conf["logger"]["level"])
    return logger

def log(level, msg, *args, **kwargs):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).log(level, msg, args, kwargs)

def log_info(*msg):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).info(msg)

def log_debug(*msg):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).debug(msg)

def log_warning(*msg):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).warning(msg)

def log_error(*msg):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).error(msg)

def log_exception(*msg):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).exception(msg)

def log_critical(*msg):
    """
    """
    exst = traceback.extract_stack()
    filepath = exst[-2][0]
    file = os.path.split(filepath)[-1]
    moduleName = os.path.splitext(file)[0]

    logger.getLogger(moduleName).critical(msg)

def main(argv):
    """
    """
    log_info('s1')
    print "i am run."
    log_info('s2')

if __name__ == "__main__":
    """
    """
    main(sys.argv[1:])
    sys.exit()
