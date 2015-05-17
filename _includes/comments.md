{% if site.duoshuo %}
	{% if page.thread %}
	<div class="ds-thread" data-thread-key="{{ page.thread }}" data-url="{{ site.url }}{{ page.url }}" data-title="{{ page.title }}" />
	{% else %}
	<div class="ds-thread" />
	{% endif %}	
	<script type="text/javascript">
	var duoshuoQuery = {short_name:"{{ site.duoshuo }}"};
	(function() {
		var ds = document.createElement('script');
		ds.type = 'text/javascript';ds.async = true;
		ds.src = 'http://static.duoshuo.com/embed.js';
		ds.charset = 'UTF-8';
		(document.getElementsByTagName('head')[0] 
		|| document.getElementsByTagName('body')[0]).appendChild(ds);
	})();
	</script>
{% endif %}

{% if site.uyan %}
    {% if page.thread %}
    <div class="ds-thread" data-thread-key="{{ page.thread }}" data-url="{{ site.url }}{{ page.url }}" data-title="{{ page.title }}" />
    {% else %}
    <div class="ds-thread" />
    {% endif %} 
    <div id="uyan_frame"></div>
    <script type="text/javascript">
        var uyan_uid = '{{ site.uyan}}';
        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
            var uyan = document.createElement('script'); uyan.type = 'text/javascript'; uyan.async = true;
            uyan.src = 'http://v2.uyan.cc/code/uyan.js?uid='+uyan_uid;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(uyan);
        })();
    </script>
{% endif %}