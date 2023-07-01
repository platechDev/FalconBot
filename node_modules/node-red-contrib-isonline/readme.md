node-red-contrib-isonline
========================

Install
-------
Run command on Node-RED installation directory

	npm install node-red-contrib-isonline
	
Config
-------

A <a href="http://nodered.org" target="_new">Node-RED</a> node to check if the Internet connection is up. A node that check Internet connection on receiving a message.</p>
  
 <b>URL: </b> Check the general Internet connection if blank or check if the specific server is online.<br>
   <code>msg.url: </code> if set overrides URL in the configuration box.<br>
    <code>msg.timeout</code>: if set overrides default timeout value (1000 ms).</p><br>
 <b>Action:</b>
   <ul>
       <li><b>True or false:</b> returns <i>true</i> or <i>false</i> as <cod>msg.payload</code></li>
       <li><b>Pass through if online</b>: returns <code>msg</code> if Internet connection is online and
              <code>null</code> otherwise. <code>msg.payload</code> is unchanged.</li>
       <li><b>Pass through if offline</b>: returns <code>msg</code> if Internet connection is offline and
              <code>null</code> otherwise. <code>msg.payload</code> is unchanged.</li>
       <li><b>Always pass through</b>: returns original <code>msg</code> (<code>msg.payload</code> and 
              <code>msg.topic</code> is unchanged. <code>msg.online</code> contains the status of request.
    </ul>
   
    
<p><code>msg.online</code> always contains the connection status<br>
<code>msg.timestamp</code> contains the timestamp<br>
<code>msg.online_error</code> contains the error string. Typically <i>timeout</i></p>
