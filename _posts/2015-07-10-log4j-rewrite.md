---
layout: post
title: "log4j改造"
description: ""
category:log4j
tags: [log4j]
---

#### AsyncConsoleAppender

```java
package com.common.log4j;

import org.apache.log4j.ConsoleAppender;

/**
 * 异步日志Appender，支持.properties方式配置。支持同时按天和按照大小记录.
 */
public class AsyncConsoleAppender extends AsyncWriterAppender {
    /**
     * 控制台输出.
     */
    private ConsoleAppender appender = new ConsoleAppender();

    /**
     * 构造函数.
     */
    public AsyncConsoleAppender() {
        super();
        super.setAppender(appender);
        this.addAppender(appender);
    }

    /**
     * Recognized values are
     * "System.out" and "System.err". Any other value will be ignored.
     *
     * @param value Sets the value of the <b>Target</b> option.
     */
    public void setTarget(String value) {
        appender.setTarget(value);
    }

    /**
     * Returns the current value of the <b>Target</b> property. The default
     * value of the option is "System.out".
     * See also {@link #setTarget}.
     *
     * @return target 目标
     */
    public String getTarget() {
        return appender.getTarget();
    }

    /**
     * Sets whether the appender honors reassignments of System.out or
     * System.err made after configuration.
     *
     * @param newValue
     *            if true, appender will use value of System.out or System.err
     *            in force at the time when logging events are appended.
     * @since 1.2.13
     */
    public final void setFollow(final boolean newValue) {
        appender.setFollow(newValue);
    }

    /**
     * Gets whether the appender honors reassignments of System.out or
     * System.err made after configuration.
     *
     * @return true if appender will use value of System.out or System.err in
     *         force at the time when logging events are appended.
     * @since 1.2.13
     */
    public final boolean getFollow() {
        return appender.getFollow();
    }

}
```

#### AsyncFileAppender
```java
package com.common.log4j;

import java.io.IOException;

/**
 * 异步日志Appender，支持.properties方式配置。支持同时按天和按照大小记录.
 */
public class AsyncFileAppender extends AsyncWriterAppender {
    /**
     * 追加器.
     */
    private DailyRollingFileAppender appender = new DailyRollingFileAppender();

    /**
     * 构造函数.
     */
    public AsyncFileAppender() {
        super();
        super.setAppender(appender);
        // appender.setMaxBackupIndex(-1); // 强制设置为-1：无最大限制
        // appender.setMaximumFileSize(100L * 1024L * 1024L); // 默认文件大小 100M
        this.addAppender(appender);
    }

    /**
     * The <b>File</b> property takes a string value which should be the name of
     * the file to append to.
     * <p>
     * <font color="#DD0044"><b>Note that the special values "System.out" or "System.err" are no longer honored.</b></font>
     * <p>
     * Note: Actual opening of the file is made when {@link #activateOptions} is called, not when the options are set.
     *
     * @param file 日志文件
     */
    public void setFile(String file) {
        appender.setFile(file);
    }

    /**
     * @return Returns the value of the <b>Append</b> option.
     */
    public boolean getAppend() {
        return appender.getAppend();
    }

    /** @return Returns the value of the <b>File</b> option. */
    public synchronized String getFile() {
        return appender.getFile();
    }

    /**
     * BufferedIO will significatnly increase performance on heavily loaded systems.
     *
     * @return Get the value of the <b>BufferedIO</b> option.
     */
    public boolean getBufferedIO() {
        return appender.getBufferedIO();
    }

    /**
     * Get the size of the IO buffer.
     */
    @Override
    public int getBufferSize() {
        return appender.getBufferSize();
    }

    /**
     * The <b>Append</b> option takes a boolean value. It is set to <code>true</code> by default. If true, then <code>File</code> will be
     * opened in append mode by {@link #setFile setFile} (see above). Otherwise, {@link #setFile setFile} will open <code>File</code> in truncate mode.
     * <p>
     * Note: Actual opening of the file is made when {@link #activateOptions} is called, not when the options are set.
     *
     * @param flag 追加标识
     */
    public void setAppend(boolean flag) {
        appender.setAppend(flag);
    }

    /**
     * The <b>BufferedIO</b> option takes a boolean value. It is set to <code>false</code> by default. If true, then <code>File</code> will be
     * opened and the resulting {@link java.io.Writer} wrapped around a {@link java.io.BufferedWriter}.
     * BufferedIO will significatnly increase performance on heavily loaded
     * systems.
     *
     * @param bufferedIO bufferedIO
     */
    public void setBufferedIO(boolean bufferedIO) {
        appender.setBufferedIO(bufferedIO);
    }

    /**
     * Set the size of the IO buffer.
     */
    @Override
    public void setBufferSize(int bufferSize) {
        appender.setBufferSize(bufferSize);
    }

    /**
     * <p>
     * Sets and <i>opens</i> the file where the log output will go. The specified file must be writable.
     * <p>
     * If there was already an opened file, then the previous file is closed first.
     * <p>
     * <b>Do not use this method directly. To configure a FileAppender or one of its subclasses, set its properties one by one and then call activateOptions.</b>
     *
     * @param fileName
     *            The path to the log file.
     * @param append
     *            If true will append to fileName. Otherwise will truncate
     *            fileName.
     * @param bufferedIO bufferedIO
     * @param bufferSize bufferSize
     * @throws IOException io异常
     */
    public synchronized void setFile(String fileName, boolean append,
            boolean bufferedIO, int bufferSize) throws IOException {
        appender.setFile(fileName, append, bufferedIO, bufferSize);
    }

    /**
     * Get the maximum size that the output file is allowed to reach before
     * being rolled over to backup files.
     *
     * @return maximum size of file
     *
     * @since 1.1
     */
    public long getMaximumFileSize() {
        return appender.getMaximumFileSize();
    }

    /**
     * Set the maximum size that the output file is allowed to reach before
     * being rolled over to backup files.
     *
     * <p>
     * This method is equivalent to {@link #setMaxFileSize} except that it is
     * required for differentiating the setter taking a <code>long</code>
     * argument from the setter taking a <code>String</code> argument by the
     * JavaBeans {@link java.beans.Introspector Introspector}.
     * </p>
     *
     * @param maxFileSize max file size
     *
     * @see #setMaxFileSize(String)
     *
     */
    public void setMaximumFileSize(long maxFileSize) {
        appender.setMaximumFileSize(maxFileSize);
    }

    /**
     * Set the maximum size that the output file is allowed to reach before
     * being rolled over to backup files.
     *
     * <p>
     * In configuration files, the <b>MaxFileSize</b> option takes an long
     * integer in the range 0 - 2^63. You can specify the value with the
     * suffixes "KB", "MB" or "GB" so that the integer is interpreted being
     * expressed respectively in kilobytes, megabytes or gigabytes. For example,
     * the value "10KB" will be interpreted as 10240.
     *
     * @param value maximum size of file
     *
     */
    public void setMaxFileSize(String value) {
        appender.setMaxFileSize(value);
    }

    /**
     * Returns the value of the <b>MaxBackupIndex</b> option.
     * @return the value of the <b>MaxBackupIndex</b> option
     */
    public int getMaxBackupIndex() {
        return appender.getMaxBackupIndex();
    }

    /**
     * Set the maximum number of backup files to keep around.
     *
     * <p>
     * The <b>MaxBackupIndex</b> option determines how many backup files are
     * kept before the oldest is erased. This option takes a positive integer
     * value. If set to zero, then there will be no backup files and the log
     * file will be truncated when it reaches <code>MaxFileSize</code>.
     *
     * @param maxBackups maximum backup size
     */
    public void setMaxBackupIndex(int maxBackups) {
        appender.setMaxBackupIndex(maxBackups);
    }

    /**
     * The <b>DatePattern</b> takes a string in the same format as expected by {@link java.text.SimpleDateFormat}. This options determines the rollover schedule.
     *
     * @param pattern date pattern
     */
    public void setDatePattern(String pattern) {
        appender.setDatePattern(pattern);
    }

    /**
     * Returns the value of the <b>DatePattern</b> option.
     *
     * @return return date pattern
     * */
    public String getDatePattern() {
        return appender.getDatePattern();
    }
}
```

#### AsyncWriterAppender
```java
package com.common.log4j;

import java.io.Writer;
import java.lang.reflect.Field;

import org.apache.log4j.AsyncAppender;
import org.apache.log4j.Layout;
import org.apache.log4j.Priority;
import org.apache.log4j.WriterAppender;
import org.apache.log4j.spi.ErrorHandler;
import org.apache.log4j.spi.Filter;
import org.apache.log4j.spi.LoggingEvent;

/**
 * 自定义异步日志appender.
 * @author anaer
 *
 */
public class AsyncWriterAppender extends AsyncAppender {
    /**
     * appender.
     */
    protected WriterAppender appender;

    /**
     * 无参构造.
     */
    public AsyncWriterAppender() {
        super();
        setQueueSize(4096); // 调整队里长度为4096，防止默认的128造成频繁的写线程同步
    }

    /**
     * get.
     * @param appender appender
     */
    public final void setAppender(WriterAppender appender) {
        this.appender = appender;
    }

    /**
     * 设置队列长度.
     *
     * @param size 队列长度
     */
    public final void setQueueSize(int size) {
        super.setBufferSize(size);
    }

    @Override
    public final void append(LoggingEvent event) {
        // 上下文必须在AsyncAppender中进行包装，而其子线程和LogContext不在同一个线程中
        LogContext logContext = LogContext.getLogContext();
        if (logContext != null) {
            wrapMessage(logContext, event);
        }

        super.append(event);
    }

    /**
     * 封装原始信息.
     *
     * @param logContext 日志上下文
     * @param event 日志事件
     */
    private void wrapMessage(LogContext logContext, LoggingEvent event) {
        try {
            Field field = LoggingEvent.class.getField("message");
            field.setAccessible(true);
            Object oldMessage = field.get(event);
            if (oldMessage instanceof String) {
                field.set(event, logContext.wrapMessage((String) oldMessage));
            }
        } catch (Exception e) {
            // IGNORE
        }

        try {
            Field field = LoggingEvent.class
                    .getDeclaredField("renderedMessage");
            field.setAccessible(true);
            Object oldMessage = field.get(event);
            if (oldMessage != null) {
                field.set(event, logContext.wrapMessage((String) oldMessage));
            }
        } catch (Exception e) {
            // IGNORE
        }
    }

    /**
     * Add a filter to end of the filter list.
     *
     * @since 0.9.0
     */
    @Override
    public final void addFilter(Filter newFilter) {
        appender.addFilter(newFilter);
    }

    /**
     * Clear the filters chain.
     *
     * @since 0.9.0
     */
    @Override
    public final void clearFilters() {
        appender.clearFilters();
    }

    /**
     * Return the currently set {@link ErrorHandler} for this Appender.
     *
     * @since 0.9.0
     */
    @Override
    public final synchronized ErrorHandler getErrorHandler() {
        return appender.getErrorHandler();
    }

    /**
     * Returns the head Filter.
     *
     * @since 1.1
     */
    @Override
    public final Filter getFilter() {
        return appender.getFilter();
    }

    /**
     * Returns the layout of this appender. The value may be null.
     */
    @Override
    public final Layout getLayout() {
        return appender.getLayout();
    }

    /**
     * Returns this appenders threshold level. See the {@link #setThreshold}
     * method for the meaning of this option.
     *
     * @since 1.1
     */
    @Override
    public final Priority getThreshold() {
        return appender.getThreshold();
    }

    /**
     * Check whether the message level is below the appender's threshold. If
     * there is no threshold set, then the return value is always
     * <code>true</code>.
     */
    @Override
    public final boolean isAsSevereAsThreshold(Priority priority) {
        return appender.isAsSevereAsThreshold(priority);
    }

    /**
     * Set the {@link ErrorHandler} for this Appender.
     *
     * @since 0.9.0
     */
    @Override
    public final synchronized void setErrorHandler(ErrorHandler eh) {
        appender.setErrorHandler(eh);
    }

    /**
     * Set the layout for this appender. Note that some appenders have their own
     * (fixed) layouts or do not use one. For example, the
     * {@link org.apache.log4j.net.SocketAppender} ignores the layout set here.
     */
    @Override
    public final void setLayout(Layout layout) {
        appender.setLayout(layout);
    }

    /**
     * Set the name of this Appender.
     */
    @Override
    public final void setName(String name) {
        super.setName(name);
        appender.setName(name);
    }

    /**
     * Set the threshold level. All log events with lower level than the
     * threshold level are ignored by the appender.
     *
     * <p>
     * In configuration files this option is specified by setting the value of
     * the <b>Threshold</b> option to a level string, such as "DEBUG", "INFO"
     * and so on.
     *
     * @since 0.8.3
     */
    @Override
    public final void setThreshold(Priority threshold) {
        appender.setThreshold(threshold);
    }

    /**
     * If the <b>ImmediateFlush</b> option is set to <code>true</code>, the
     * appender will flush at the end of each write. This is the default
     * behavior. If the option is set to <code>false</code>, then the underlying
     * stream can defer writing to physical medium to a later time.
     *
     * <p>
     * Avoiding the flush operation at the end of each append results in a
     * performance gain of 10 to 20 percent. However, there is safety tradeoff
     * involved in skipping flushing. Indeed, when flushing is skipped, then it
     * is likely that the last few log events will not be recorded on disk when
     * the application exits. This is a high price to pay even for a 20%
     * performance gain.
     * @param value value
     */
    public final void setImmediateFlush(boolean value) {
        appender.setImmediateFlush(value);
    }

    /**
     * Returns value of the <b>ImmediateFlush</b> option.
     * @return ImmediateFlush
     */
    public final boolean getImmediateFlush() {
        return appender.getImmediateFlush();
    }

    /**
     * Close this appender instance. The underlying stream or writer is also
     * closed.
     *
     * <p>
     * Closed appenders cannot be reused.
     *
     * @see #setWriter
     * @since 0.8.4
     */
    @Override
    public final synchronized void close() {
        super.close();
        appender.close();
    }

    /**
     * getEncoding.
     * @return encoding
     */
    public final String getEncoding() {
        return appender.getEncoding();
    }

    /**
     * setEncoding.
     * @param value encoding
     */
    public final void setEncoding(String value) {
        appender.setEncoding(value);
    }

    /**
     * <p>
     * Sets the Writer where the log output will go. The specified Writer must
     * be opened by the user and be writable.
     *
     * <p>
     * The <code>java.io.Writer</code> will be closed when the appender instance
     * is closed.
     *
     *
     * <p>
     * <b>WARNING:</b> Logging to an unopened Writer will fail.
     * <p>
     *
     * @param writer
     *            An already opened Writer.
     */
    public final synchronized void setWriter(Writer writer) {
        appender.setWriter(writer);
    }

    /**
     * The WriterAppender requires a layout. Hence, this method returns
     * <code>true</code>.
     */
    @Override
    public final boolean requiresLayout() {
        return appender.requiresLayout();
    }

    @Override
    public final void activateOptions() {
        appender.activateOptions();
        super.activateOptions();
    }

}
```

#### DailyRollingFileAppender
```java
package com.common.log4j;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;

import org.apache.log4j.FileAppender;
import org.apache.log4j.Layout;
import org.apache.log4j.helpers.CountingQuietWriter;
import org.apache.log4j.helpers.LogLog;
import org.apache.log4j.helpers.OptionConverter;
import org.apache.log4j.spi.LoggingEvent;

/**
 * DailyRollingFileAppender extends {@link FileAppender} so that the underlying
 * file is rolled over at a user chosen frequency.
 *
 * <p>
 * The rolling schedule is specified by the <b>DatePattern</b> option. This
 * pattern should follow the {@link SimpleDateFormat} conventions. In
 * particular, you <em>must</em> escape literal text within a pair of single
 * quotes. A formatted version of the date pattern is used as the suffix for the
 * rolled file name.
 * </p>
 * <p>
 * For example, if the <b>File</b> option is set to <code>/foo/bar.log</code>
 * and the <b>DatePattern</b> set to <code>'.'yyyy-MM-dd</code>, on 2001-02-16
 * at midnight, the logging file <code>/foo/bar.log</code> will be copied to
 * <code>/foo/bar.log.2001-02-16</code> and logging for 2001-02-17 will continue
 * in <code>/foo/bar.log</code> until it rolls over the next day.
 * </p>
 * <p>
 * Is is possible to specify monthly, weekly, half-daily, daily, hourly, or
 * minutely rollover schedules.
 * </p>
 *
 * <p>
 * Do not use the colon ":" character in anywhere in the <b>DatePattern</b>
 * option. The text before the colon is interpeted as the protocol specificaion
 * of a URL which is probably not what you want.
 * </p>
 *
 * @see org.apache.log4j.DailyRollingFileAppender
 */
public class DailyRollingFileAppender extends FileAppender {

    /**
     * RollingCalendar is a helper class to DailyRollingFileAppender. Given a
     * periodicity type and the current time, it computes the start of the next
     * interval.
     * */
    class RollingCalendar extends GregorianCalendar {

        /**
         *
         */
        private static final long serialVersionUID = 8285331607381376330L;
        /**
         * 类型.
         */
        int type = DailyRollingFileAppender.TOP_OF_TROUBLE;

        /**
         * 无参构造.
         */
        RollingCalendar() {
            super();
        }

        /**
         * 构造函数.
         *
         * @param tz 时区
         * @param locale 地区
         */
        RollingCalendar(TimeZone tz, Locale locale) {
            super(tz, locale);
        }

        /**
         * 获取下一个检查日期.
         *
         * @param now 日期
         * @return 下一个检查日期
         */
        public Date getNextCheckDate(Date now) {
            this.setTime(now);

            switch (type) {
                case DailyRollingFileAppender.TOP_OF_MINUTE:
                    this.set(Calendar.SECOND, 0);
                    this.set(Calendar.MILLISECOND, 0);
                    this.add(Calendar.MINUTE, 1);
                    break;
                case DailyRollingFileAppender.TOP_OF_HOUR:
                    this.set(Calendar.MINUTE, 0);
                    this.set(Calendar.SECOND, 0);
                    this.set(Calendar.MILLISECOND, 0);
                    this.add(Calendar.HOUR_OF_DAY, 1);
                    break;
                case DailyRollingFileAppender.HALF_DAY:
                    this.set(Calendar.MINUTE, 0);
                    this.set(Calendar.SECOND, 0);
                    this.set(Calendar.MILLISECOND, 0);
                    int hour = get(Calendar.HOUR_OF_DAY);
                    if (hour < 12) {
                        this.set(Calendar.HOUR_OF_DAY, 12);
                    } else {
                        this.set(Calendar.HOUR_OF_DAY, 0);
                        this.add(Calendar.DAY_OF_MONTH, 1);
                    }
                    break;
                case DailyRollingFileAppender.TOP_OF_DAY:
                    this.set(Calendar.HOUR_OF_DAY, 0);
                    this.set(Calendar.MINUTE, 0);
                    this.set(Calendar.SECOND, 0);
                    this.set(Calendar.MILLISECOND, 0);
                    this.add(Calendar.DATE, 1);
                    break;
                case DailyRollingFileAppender.TOP_OF_WEEK:
                    this.set(Calendar.DAY_OF_WEEK, getFirstDayOfWeek());
                    this.set(Calendar.HOUR_OF_DAY, 0);
                    this.set(Calendar.SECOND, 0);
                    this.set(Calendar.MILLISECOND, 0);
                    this.add(Calendar.WEEK_OF_YEAR, 1);
                    break;
                case DailyRollingFileAppender.TOP_OF_MONTH:
                    this.set(Calendar.DATE, 1);
                    this.set(Calendar.HOUR_OF_DAY, 0);
                    this.set(Calendar.SECOND, 0);
                    this.set(Calendar.MILLISECOND, 0);
                    this.add(Calendar.MONTH, 1);
                    break;
                default:
                    throw new IllegalStateException("Unknown periodicity type.");
            }
            return getTime();
        }

        /**
         * 获取下一个检查日期.
         *
         * @param now 日期
         * @return 毫秒数
         */
        public long getNextCheckMillis(Date now) {
            return getNextCheckDate(now).getTime();
        }

        /**
         * @param type the type to set
         */
        void setType(int type) {
            this.type = type;
        }
    }

    /**
     * The gmtTimeZone is used only in computeCheckPeriod() method.
     */
    static final TimeZone GMT_TIME_ZONE = TimeZone.getTimeZone("GMT");
    /**
     * 半天.
     */
    static final int HALF_DAY = 2;
    /**
     *
     */
    static final int TOP_OF_DAY = 3;
    /**
     *
     */
    static final int TOP_OF_HOUR = 1;
    /**
     *
     */
    static final int TOP_OF_MINUTE = 0;
    /**
     *
     */
    static final int TOP_OF_MONTH = 5;

    /**
     * The code assumes that the following constants are in a increasing sequence.
     */
    static final int TOP_OF_TROUBLE = -1;

    /**
     *
     */
    static final int TOP_OF_WEEK = 4;

    /**
     *
     */
    int checkPeriod = TOP_OF_TROUBLE;

    /**
     * The date pattern. By default, the pattern is set to "'.'yyyy-MM-dd"
     * meaning daily rollover.
     */
    private String datePattern = "'.'yyyy-MM-dd";

    /**
     * There is all backup file by default.
     */
    protected int maxBackupIndex = -1;

    /**
     * The default maximum file size is 100MB.
     */
    protected long maxFileSize = 100 * 1024 * 1024;

    /**
     * The next time we estimate a rollover should occur.
     */
    private long nextCheck = System.currentTimeMillis() - 1;

    /**
     * 当前时间.
     */
    Date now = new Date();
    /**
     *
     */
    RollingCalendar rc = new RollingCalendar();

    /**
     * The log file will be renamed to the value of the scheduledFilename
     * variable when the next interval is entered. For example, if the rollover
     * period is one hour, the log file will be renamed to the value of
     * "scheduledFilename" at the beginning of the next hour.
     *
     * The precise time when a rollover occurs depends on logging activity.
     */
    private String scheduledFilename;

    /**
     * 日期格式.
     */
    SimpleDateFormat sdf;

    /**
     * The default constructor does nothing.
     */
    public DailyRollingFileAppender() {
    }

    /**
     * Instantiate a <code>DailyRollingFileAppender</code> and open the file
     * designated by <code>filename</code>. The opened filename will become the
     * ouput destination for this appender.
     *
     * @param layout layout
     * @param filename file name
     * @param datePattern date pattern
     *
     * @exception IOException io failed
     */
    public DailyRollingFileAppender(Layout layout, String filename,
            String datePattern) throws IOException {
        super(layout, filename, true);
        this.datePattern = datePattern;
        activateOptions();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public final void activateOptions() {
        super.activateOptions();
        if (datePattern != null && fileName != null) {
            now.setTime(System.currentTimeMillis());
            sdf = new SimpleDateFormat(datePattern);
            int type = computeCheckPeriod();
            printPeriodicity(type);
            rc.setType(type);
            File file = new File(fileName);
            scheduledFilename = fileName
                    + sdf.format(new Date(file.lastModified()));

        } else {
            LogLog.error("Either File or DatePattern options are not set for appender ["
                    + name + "].");
        }
    }

    /**
     * This method computes the roll over period by looping over the periods,
     * starting with the shortest, and stopping when the r0 is different from
     * from r1, where r0 is the epoch formatted according the datePattern
     * (supplied by the user) and r1 is the epoch+nextMillis(i) formatted
     * according to datePattern. All date formatting is done in GMT and not
     * local format because the test logic is based on comparisons relative to
     * 1970-01-01 00:00:00 GMT (the epoch).
     * @return int
     */
    final int computeCheckPeriod() {
        RollingCalendar rollingCalendar = new RollingCalendar(GMT_TIME_ZONE,
                Locale.ENGLISH);
        // set sate to 1970-01-01 00:00:00 GMT
        Date epoch = new Date(0);
        if (datePattern != null) {
            for (int i = TOP_OF_MINUTE; i <= TOP_OF_MONTH; i++) {
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
                        datePattern);
                simpleDateFormat.setTimeZone(GMT_TIME_ZONE); // do all date
                // formatting in GMT
                String r0 = simpleDateFormat.format(epoch);
                rollingCalendar.setType(i);
                Date next = new Date(rollingCalendar.getNextCheckMillis(epoch));
                String r1 = simpleDateFormat.format(next);
                // System.out.println("Type = "+i+", r0 = "+r0+", r1 = "+r1);
                if (r0 != null && r1 != null && !r0.equals(r1)) {
                    return i;
                }
            }
        }
        return TOP_OF_TROUBLE; // Deliberately head for trouble...
    }

    /**
     * Returns the value of the <b>DatePattern</b> option.
     *
     * @return return date pattern
     * */
    public final String getDatePattern() {
        return datePattern;
    }

    /**
     * Returns the value of the <b>MaxBackupIndex</b> option.
     * @return the value of the <b>MaxBackupIndex</b> option
     */
    public final int getMaxBackupIndex() {
        return maxBackupIndex;
    }

    /**
     * Get the maximum size that the output file is allowed to reach before
     * being rolled over to backup files.
     *
     * @return maximum size of file
     *
     * @since 1.1
     */
    public final long getMaximumFileSize() {
        return maxFileSize;
    }

    /**
     * 打印日志周期.
     *
     * @param type 周期类型
     */
    final void printPeriodicity(int type) {
        switch (type) {
            case TOP_OF_MINUTE:
                LogLog.debug("Appender [" + name + "] to be rolled every minute.");
                break;
            case TOP_OF_HOUR:
                LogLog.debug("Appender [" + name
                        + "] to be rolled on top of every hour.");
                break;
            case HALF_DAY:
                LogLog.debug("Appender [" + name
                        + "] to be rolled at midday and midnight.");
                break;
            case TOP_OF_DAY:
                LogLog.debug("Appender [" + name + "] to be rolled at midnight.");
                break;
            case TOP_OF_WEEK:
                LogLog.debug("Appender [" + name
                        + "] to be rolled at start of week.");
                break;
            case TOP_OF_MONTH:
                LogLog.debug("Appender [" + name
                        + "] to be rolled at start of every month.");
                break;
            default:
                LogLog.warn("Unknown periodicity for appender [" + name + "].");
        }
    }

    /**
     * The <b>DatePattern</b> takes a string in the same format as expected by
     * {@link SimpleDateFormat}. This options determines the rollover schedule.
     *
     * @param pattern date pattern
     */
    public final void setDatePattern(String pattern) {
        datePattern = pattern;
    }

    @Override
    public final synchronized void setFile(String fileName, boolean append,
            boolean bufferedIO, int bufferSize) throws IOException {
        super.setFile(fileName, append, this.bufferedIO, this.bufferSize);
        if (append) {
            File f = new File(fileName);
            ((CountingQuietWriter) qw).setCount(f.length());
        }
    }

    /**
     * Set the maximum number of backup files to keep around.
     *
     * <p>
     * The <b>MaxBackupIndex</b> option determines how many backup files are
     * kept before the oldest is erased. This option takes a positive integer
     * value. If set to zero, then there will be no backup files and the log
     * file will be truncated when it reaches <code>MaxFileSize</code>.
     *
     * @param maxBackups maximum backup size
     */
    public final void setMaxBackupIndex(int maxBackups) {
        this.maxBackupIndex = maxBackups;
    }

    /**
     * Set the maximum size that the output file is allowed to reach before
     * being rolled over to backup files.
     *
     * <p>
     * In configuration files, the <b>MaxFileSize</b> option takes an long
     * integer in the range 0 - 2^63. You can specify the value with the
     * suffixes "KB", "MB" or "GB" so that the integer is interpreted being
     * expressed respectively in kilobytes, megabytes or gigabytes. For example,
     * the value "10KB" will be interpreted as 10240.
     *
     * @param value maximum size of file
     *
     */
    public final void setMaxFileSize(String value) {
        maxFileSize = OptionConverter.toFileSize(value, maxFileSize + 1);
    }

    /**
     * Set the maximum size that the output file is allowed to reach before
     * being rolled over to backup files.
     *
     * <p>
     * This method is equivalent to {@link #setMaxFileSize} except that it is
     * required for differentiating the setter taking a <code>long</code>
     * argument from the setter taking a <code>String</code> argument by the
     * JavaBeans {@link java.beans.Introspector Introspector}.
     * </p>
     *
     * @param maxFileSize max file size
     *
     * @see #setMaxFileSize(String)
     *
     */
    public final void setMaximumFileSize(long maxFileSize) {
        this.maxFileSize = maxFileSize;
    }

    @Override
    protected final void setQWForFiles(Writer writer) {
        this.qw = new CountingQuietWriter(writer, errorHandler);
    }

    /**
     * Implements the usual roll over behaviour.
     *
     * <p>
     * If <code>MaxBackupIndex</code> is positive, then files {
     * <code>File.1</code>, ..., <code>File.MaxBackupIndex -1</code> are renamed
     * to {<code>File.2</code>, ..., <code>File.MaxBackupIndex</code> .
     * Moreover, <code>File</code> is renamed <code>File.1</code> and closed. A
     * new <code>File</code> is created to receive further log output.
     *
     * <p>
     * If <code>MaxBackupIndex</code> is equal to zero, then the
     * <code>File</code> is truncated with no backup files created.
     */
    public final// synchronization not necessary since doAppend is alreasy synched
    void sizeRollOver() {
        File target;
        File file;

        LogLog.debug("rolling over count="
                + ((CountingQuietWriter) qw).getCount());
        LogLog.debug("maxBackupIndex=" + maxBackupIndex);

        String datedFilename = fileName + sdf.format(now);

        if (maxBackupIndex > 0) {
            // Delete the oldest file, to keep Windows happy.
            file = new File(datedFilename + '.' + maxBackupIndex);
            if (file.exists()) {
                file.delete();
            }

            // Map {(maxBackupIndex - 1), ..., 2, 1} to {maxBackupIndex, ..., 3,
            // 2}
            for (int i = maxBackupIndex - 1; i >= 1; i--) {
                file = new File(datedFilename + "." + i);
                if (file.exists()) {
                    target = new File(datedFilename + '.' + (i + 1));
                    LogLog.debug("Renaming file " + file + " to " + target);
                    file.renameTo(target);
                }
            }

            // Rename fileName to datedFilename.1
            target = new File(datedFilename + "." + 1);

            this.closeFile(); // keep windows happy.

            file = new File(fileName);
            LogLog.debug("Renaming file " + file + " to " + target);
            file.renameTo(target);
        } else if (maxBackupIndex < 0) { // infinite number of files
            // find the max backup index
            for (int i = 1; i < Integer.MAX_VALUE; i++) {
                target = new File(datedFilename + "." + i);
                if (!target.exists()) { // Rename fileName to datedFilename.i
                    this.closeFile();
                    file = new File(fileName);
                    file.renameTo(target);
                    LogLog.debug("Renaming file " + file + " to " + target);
                    break;
                }
            }
        }

        try {
            // This will also close the file. This is OK since multiple
            // close operations are safe.
            this.setFile(fileName, false, bufferedIO, bufferSize);
        } catch (IOException e) {
            LogLog.error("setFile(" + fileName + ", false) call failed.", e);
        }
        scheduledFilename = datedFilename;
    }

    /**
     * This method differentiates DailyRollingFileAppender from its super
     * class.
     *
     * <p>
     * Before actually logging, this method will check whether it is time to do
     * a rollover. If it is, it will schedule the next rollover time and then
     * rollover.
     * */
    @Override
    protected final void subAppend(LoggingEvent event) {
        long n = System.currentTimeMillis();

        if (n >= nextCheck) {
            now.setTime(n);
            nextCheck = rc.getNextCheckMillis(now);
            try {
                timeRollOver();
            } catch (IOException ioe) {
                LogLog.error("rollOver() failed.", ioe);
            }
        } else if (fileName != null
                && ((CountingQuietWriter) qw).getCount() >= maxFileSize) {
            sizeRollOver();
        }
        super.subAppend(event);

    }

    /**
     * Rollover the current file to a new file.
     * @throws IOException io异常
     */
    final void timeRollOver() throws IOException {

        /* Compute filename, but only if datePattern is specified */
        if (datePattern == null) {
            errorHandler.error("Missing DatePattern option in rollOver().");
            return;
        }

        String datedFilename = fileName + sdf.format(now);
        // It is too early to roll over because we are still within the
        // bounds of the current interval. Rollover will occur once the
        // next interval is reached.
        if (scheduledFilename.equals(datedFilename)) {
            return;
        }

        // close current file, and rename it to datedFilename
        this.closeFile();

        File target = new File(scheduledFilename);
        if (target.exists()) {
            target.delete();
        }

        File file = new File(fileName);
        boolean result = file.renameTo(target);
        if (result) {
            LogLog.debug(fileName + " -> " + scheduledFilename);
        } else {
            LogLog.error("Failed to rename [" + fileName + "] to ["
                    + scheduledFilename + "].");
        }

        try {
            // This will also close the file. This is OK since multiple
            // close operations are safe.
            super.setFile(fileName, false, this.bufferedIO, this.bufferSize);
        } catch (IOException e) {
            errorHandler.error("setFile(" + fileName + ", false) call failed.");
        }
        scheduledFilename = datedFilename;
    }
}

```

#### LogContext
```java
package com.common.log4j;

/**
 * 日志上下文环境信息.
 */
public class LogContext {
    /**
     * 日志上下文变量.
     */
    private static final ThreadLocal<LogContext> LOG_CONTEXTS = new ThreadLocal<LogContext>();
    /**
     * 全局ID，用于跨系统日志进行关联.
     */
    private String uuid;
    /**
     * sessionID.
     */
    private String sessionId;
    /**
     * 用户ID.
     */
    private String userId;
    /**
     * 客户端IP.
     */
    private String clientIp;

    /**
     * 初始化日志上下文信息.
     *
     * @param logContext 日志上下文.
     */
    public static void initContext(LogContext logContext) {
        LOG_CONTEXTS.set(logContext);
    }

    /**
     * 清除日志上下文信息.
     */
    public static void clearContext() {
        LOG_CONTEXTS.remove();
    }

    /**
     * 获取日志上下文信息.
     *
     * @return logContext
     */
    public static LogContext getLogContext() {
        return LOG_CONTEXTS.get();
    }

    /**
     * 对原始日志信息进行封装处理.
     *
     * @param message 消息
     * @return 封装后的消息
     */
    public String wrapMessage(String message) {
        StringBuilder msg = new StringBuilder(message);
        msg.append(" ");
        if(this.getUuid() != null) {
            msg.append(" [uuid:").append(this.getUuid()).append("]");
        }
        if(this.getSessionId() != null) {
            msg.append("[sid:").append(this.getSessionId()).append("]");
        }
        if(this.getUserId() != null) {
            msg.append("[uid:").append(this.getUserId()).append("]");
        }
        if(this.getClientIp() != null) {
            msg.append("[from:").append(this.getClientIp()).append("]");
        }
        return msg.toString();
    }

    /**
     * @return the uuid
     */
    public final String getUuid() {
        return uuid;
    }

    /**
     * @param uuid the uuid to set
     */
    public final void setUuid(String uuid) {
        this.uuid = uuid;
    }

    /**
     * @return the sessionId
     */
    public final String getSessionId() {
        return sessionId;
    }

    /**
     * @param sessionId the sessionId to set
     */
    public final void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    /**
     * @return the userId
     */
    public final String getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public final void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * @return the clientIp
     */
    public final String getClientIp() {
        return clientIp;
    }

    /**
     * @param clientIp the clientIp to set
     */
    public final void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }


}

```

#### LogContextAwareFilter
```java
package com.common.log4j;

import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.UUID;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.BeanUtils;

import com.common.utils.IpUtils;

/**
 * 日志上下文过滤器.
 *
 * @author anaer
 * @see com.common.aop.SessionFilter 推荐这种方法, 清晰明了
 */
public class LogContextAwareFilter implements Filter {
    /**
     * 用户id.
     */
    private String userIdKey;
    /**
     * uuid.
     */
    private String uuidParamName;
    /**
     * 是否支持用户信息.
     */
    private boolean supportUserId = true;
    /**
     * 是否显示额外的信息.
     */
    private boolean showExtrasInfo = true;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        userIdKey = filterConfig.getInitParameter("userIdKey");
        if(userIdKey == null || userIdKey.isEmpty()) {
            userIdKey = "sessionInfo.userId";
        }

        uuidParamName = filterConfig.getInitParameter("uuidParamName");
        if(uuidParamName == null || uuidParamName.isEmpty()) {
            uuidParamName = "log_uuid";
        }

        // 是否支持UserId
        String supportUserIdStr = filterConfig.getInitParameter("supportUserId");
        if("N".equalsIgnoreCase(supportUserIdStr) || "false".equals(supportUserIdStr)
                || "no".equals(supportUserIdStr) || "not".equals(supportUserIdStr)) {
            supportUserId = false;
        } else {
            supportUserId = true;
        }

        String showExtrasInfoStr = filterConfig.getInitParameter("showExtrasInfo");
        if ("N".equalsIgnoreCase(showExtrasInfoStr) || "false".equals(showExtrasInfoStr) || "no".equals(showExtrasInfoStr) || "not".equals(showExtrasInfoStr)) {
            showExtrasInfo = false;
        } else {
            showExtrasInfo = true;
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;

        // 根据配置判断是否显示额外信息
        if (showExtrasInfo) {
            LogContext logContext = createLogContext(req);
            LogContext.initContext(logContext);

            chain.doFilter(request, response);

            LogContext.clearContext();
        } else {
            chain.doFilter(request, response);
        }

    }

    /**
     * 创建日志上下文环境.
     *
     * @param request 请求
     * @return 日志上下文
     */
    private LogContext createLogContext(HttpServletRequest request) {
        LogContext logContext = new LogContext();

        logContext.setUuid(getUUID(request));
        logContext.setClientIp(IpUtils.getClientIp(request));
        logContext.setSessionId(getSessionId(request));
        logContext.setUserId(getUserId(request));

        return logContext;
    }

    /**
     * 获取UUID.
     *
     * @param request 请求
     * @return uuid
     */
    private String getUUID(HttpServletRequest request) {
        String uuid = request.getParameter(uuidParamName);
        if(uuid == null || uuid.isEmpty()) {
            uuid = UUID.randomUUID().toString();
        }
        return uuid;
    }

    /**
     * 获取SessionId.
     *
     * @param request 请求
     * @return sessionId
     */
    private String getSessionId(HttpServletRequest request) {
        return request.getSession().getId();
    }

    /**
     * 获取UserId.
     *
     * @param request 请求
     * @return userId
     */
    private String getUserId(HttpServletRequest request) {
        if(!supportUserId) {
            return null;
        }

        HttpSession session = request.getSession();
        Object value = session.getAttribute(userIdKey);
        if(value == null && userIdKey.indexOf('.') > 0) {
            // 通过反射机制获取数据
            String attrKey = userIdKey.substring(0, userIdKey.indexOf('.'));
            Object attr = session.getAttribute(attrKey);
            if(attr == null) {
                return null;
            }

            String remainKey = userIdKey.substring(userIdKey.indexOf('.') + 1, userIdKey.length());
            while(remainKey.indexOf('.') > 0) {
                String propertyName = remainKey.substring(0, remainKey.indexOf('.'));
                value = getPropertyValue(value, propertyName);
                if(value == null) {
                    break;
                }
                remainKey = remainKey.substring(remainKey.indexOf('.') + 1, remainKey.length());
            }
        }

        return value == null ? null : value.toString();
    }

    /**
     * 获取Bean的属性值.
     *
     * @param target 目标对象
     * @param propertyName 属性名
     * @return 属性值
     */
    private Object getPropertyValue(Object target, String propertyName) {
        PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(target.getClass(), propertyName);
        Method method = pd.getReadMethod();
        if(method == null) {
            return null;
        }

        try {
            return method.invoke(target);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void destroy() {
        // Do Noting
    }

}

```

#### web.xml
```xml
    <filter>
        <filter-name>logContextFilter</filter-name>
        <filter-class>com.common.log4j.LogContextAwareFilter</filter-class>
        <init-param>
            <param-name>showExtrasInfo</param-name>
            <param-value>false</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>logContextFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

#### log4j.properties
```
log4j.rootLogger=DEBUG, logfile, stdout
log4j.logger.novel=DEBUG, novel
#不继承父logger
log4j.additivity.novel = false

#控制台
log4j.appender.stdout=com.common.log4j.AsyncConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %16c{1} - %m%n

#写日志文件
log4j.appender.logfile=com.common.log4j.AsyncFileAppender
log4j.appender.logfile.encoding=UTF-8
log4j.appender.logfile.File=C:/Users/Administrator/Desktop/myweb.log
log4j.appender.logfile.DatePattern='.'yyyy-MM-dd
log4j.appender.logfile.MaxBackupIndex=3
log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=%d %-5p [%t] %c - %m%n

#个性化定制
log4j.logger.org.apache=INFO
log4j.logger.java.sql.ResultSet=INFO
log4j.logger.java.sql.Connection=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```
