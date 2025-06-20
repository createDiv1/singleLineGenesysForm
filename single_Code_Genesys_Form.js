console.log("%cForm design by Bronze Cooley. Contact: formdesign@bronzecooley.com. Add 'Inquiry' to the subject line.","color:yellow;");
console.log("Attributes expected: fName,lName,email,subject");

const dKey = '12343534556547546456' ; // Add your deployment key
const pEnv = 'prod'; // Add your Genesys Cloud environment
const searchKey = 'gcmcsessionActive';
const keyLookUp = `_${dKey}:gcmcsessionActive`;

var isActive = false;
var isDisconnected = false;
var isReadOnly = false;

for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key === keyLookUp){
                console.log('Live session ' + key);
                isActive = true;
        }else{
                if(key.includes(`_${dKey}`)){
                        console.log('The key deleted is ' + key);
                };
        };
};

console.log("isActive: " + isActive);

if(isActive){
        console.log("Found key");
        (function (g, e, n, es, ys) {
                g['_genesysJs'] = e;
                g[e] = g[e] || function () {
                        (g[e].q = g[e].q || []).push(arguments)
                };
                g[e].t = 1 * new Date();
                g[e].c = es;
                ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
        })(window, 'Genesys', 'https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js', {
                environment: pEnv,
                deploymentId: dKey
        });
                Genesys('subscribe','Launcher.ready',function(){
                        console.log("Launcher ready");
                        Genesys('command','Launcher.hide');
                        Genesys('subscribe','MessagingService.ready', function(){
                                Genesys('subscribe','MessagingService.readOnlyConversation',function({data}){
                                        if(isReadOnly === false){
                                                isReadOnly = true;
                                                localStorage.clear();
                                                console.log(data);
                                                console.log("Session is read only");
                                                isDisconnected = true;
                                                Genesys('command','MessagingService.resetConversation',{},function(){ console.log("Success clearing chat");},function(){ console.log("Failed to clear chat");});
                                                Genesys('subscribe','Messenger.ready',function(){
                                                        Genesys('command','Messenger.open');
                                                });
                                        };
                                });
                               Genesys('command','Launcher.show');
                        });
                });

}else{
        (function (g, e, n, es, ys) {
                g['_genesysJs'] = e;
                g[e] = g[e] || function () {
                        (g[e].q = g[e].q || []).push(arguments)
                };
                g[e].t = 1 * new Date();
                g[e].c = es;
                ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
        })(window, 'Genesys', 'https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js', {
                environment: pEnv,
                 deploymentId: dKey
        });

        Genesys('subscribe','Launcher.ready', function(){
                console.log("Launcher ready");
                Genesys('subscribe','Launcher.hide');
                if(isActive === false && isDisconnected === false){
                        console.log('isActive: ' + isActive + ', isDisconnected: ' + isDisconnected);
                        function createForm(){
                                const container = document.createElement('form');
                                container.style.position = 'fixed';
                                container.style.bottom = '20px';
                                container.style.right = '20px';
                                container.style.width = '300px';
                                container.style.height = "400px";
                                container.style.background = 'white';
                                container.style.border = '1px solid #ccc';
                                container.style.borderRadius = '8px';
                                container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                container.style.fontFamily = 'Arial, sans-serif';
                                container.style.padding = '16px';
                                container.style.zIndex = '1000';
                                container.style.display = "none";
                                container.id = 'bc_chat';

                                const title = document.createElement('h3');
                                title.textContent = 'Chat with a member of our support team';
                                title.style.marginTop = '0';
                                title.style.fontSize = '16px';
                                container.appendChild(title);

                                function createInput(labelText,type,require,name,id) {
                                        const wrapper = document.createElement('div');
                                        wrapper.style.marginBottom = '10px';
                                        const input = document.createElement('input');
                                        console.log(require);
                                        input.type = type;
                                        input.style.width = '100%';
                                        input.style.padding = '8px';
                                        input.style.marginTop = '4px';
                                        input.style.boxSizing = 'border-box';
                                        input.name = name;
                                        input.id = id;
                                        if(require === true) input.required = true;
                                        input.placeholder = labelText;
                                        wrapper.appendChild(input);
                                        return wrapper;
                                };

                                container.appendChild(createInput('First Name (Required)', 'text', true,'fName','fName'));
                                container.appendChild(createInput('Last Name (Required)', 'text', true,'lName','lName'));
                                container.appendChild(createInput('Email (Optional)', 'email',false,'email','email'));
                                container.appendChild(createInput('Subject (Optional)', 'text',false,'subject','subject'));

                                const buttonWrapper = document.createElement('div');
                                buttonWrapper.style.display = 'flex';
                                buttonWrapper.style.justifyContent = 'space-between';

                                const cancelBtn = document.createElement('button');
                                cancelBtn.textContent = 'Cancel';
                                cancelBtn.style.backgroundColor = '#ccc';
                                cancelBtn.style.padding = '8px 12px';
                                cancelBtn.style.border = 'none';
                                cancelBtn.style.borderRadius = '4px';
                                cancelBtn.style.cursor = 'pointer';
                                cancelBtn.id = "cnclButton";
                                cancelBtn.style.position = "fixed";
                                cancelBtn.style.right = "50px";
                                cancelBtn.style.display = "none";
                                cancelBtn.style.zIndex = "1001";
                                cancelBtn.onclick = () => {
                                        container.style.display = "none";
                                        startChat.style.display = "block";
                                        cancelBtn.style.display = "none";
                                        location.reload();
                                };

                                const startBtn = document.createElement('button');
                                startBtn.textContent = 'Start Chat';
                                startBtn.style.backgroundColor = '#f4c542';
                                startBtn.style.color = '#000';
                                startBtn.style.padding = '8px 12px';
                                startBtn.style.border = 'none';
                                startBtn.style.borderRadius = '4px';
                                startBtn.style.cursor = 'pointer';
                                startBtn.id = "strtBtn";

                                buttonWrapper.appendChild(startBtn);
                                container.appendChild(buttonWrapper);

                                const startChat = document.createElement("button");
                                startChat.id = "start-chat";
                                startChat.type = "button";
                                startChat.style.position = "fixed";
                                startChat.style.right = "20px";
                                startChat.style.bottom = "12px";
                                startChat.style.backgroundColor = "rgba(0,0,0,0)";
                                startChat.style.borderRadius = '50%';
                                startChat.style.border = "0px";
                                startChat.style.pointerEvents = 'auto';
                                startChat.style.zIndex = '100000';
                                startChat.onclick = () => {
                                        container.style.display = 'block';
                                        startChat.remove();
                                        const rect = startBtn.getBoundingClientRect();
                                        console.log(window.innerHeight);
                                        console.log(rect.bottom);
                                        cancelBtn.style.bottom = (window.innerHeight)- rect.bottom + "px";
                                        cancelBtn.style.display = 'block';
                                };
                                const startImg = document.createElement("img");
                                startImg.src = "https://raw.githubusercontent.com/createDiv1/Genesys-Cloud-Message-Form/refs/heads/main/createDIV1Form/img/downButton.png";
                                startImg.style.width = "72px";
                                startImg.style.height = "auto";
                                startImg.style.borderRadius = "50%";
                                startImg.alt = "Start Chat";
                                startImg.style.backgroundColor = "rgba(0,0,0,0)";
                                startChat.appendChild(startImg);


                                document.body.appendChild(cancelBtn);
                                document.body.appendChild(container);
                                document.body.appendChild(startChat);
                                console.log("Played");


                                return;
                                };
                        createForm();
                        document.getElementById('bc_chat').addEventListener('submit',function(e){
                                e.preventDefault();
                                document.getElementById('bc_chat').style.display = 'none';
                                document.getElementById('cnclButton').style.display = 'none';
                                fName = document.getElementById('fName').value;
                                lName = document.getElementById('lName').value;
                                email = document.getElementById('email').value;
                                subject = document.getElementById('subject').value;

                                Genesys('subscribe','Messenger.ready',function(){
                                        console.log("Messenger ready");
                                        Genesys('subscribe','Database.ready',function(){
                                                console.log("Database ready");
                                                Genesys('command','Messenger.open');
                                                Genesys('command','Database.set',{messaging: {customAttributes: {fName,lName,email,subject}}});
                                        });
                                });
                                Genesys('subscribe','Messenger.closed',function(){
                                        console.log("Messenger closed.");
                                });
                        });
                }else{
                        console.log('isActive: ' + isActive + ', isDisconnected: ' + isDisconnected);
                };
        });
};
