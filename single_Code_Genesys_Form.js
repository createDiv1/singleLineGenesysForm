  console.log("%cForm design by Bronze Cooley. Contact: formdesign@bronzecooley.com. Add 'Inquiry' to the subject line.","color:yellow;");
  console.log("Attributes expected: fName,lName,email,subject");
dKey = "";
pEnv = "";


  const container = document.createElement('form');
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.width = '300px';
  container.style.background = 'white';
  container.style.border = '1px solid #ccc';
  container.style.borderRadius = '8px';
  container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.padding = '16px';
  container.style.zIndex = '1000';
  container.style.display = "none";

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
  cancelBtn.style.bottom = "50px";
  cancelBtn.style.display = "none";
  cancelBtn.style.zIndex = "1001";
  cancelBtn.onclick = () => {
   container.style.display = "none";
   startChat.style.display = "block";
   cancelBtn.style.display = "none";
   location.reload(true);
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

  document.body.appendChild(cancelBtn);
  buttonWrapper.appendChild(startBtn);
  container.appendChild(buttonWrapper);

  startChat = document.createElement("button");
  startChat.id = "start-chat";
  startChat.style.border = "0px solid";
  startChat.type = "button";
  startChat.style.position = "fixed";
  startChat.style.right = "5px";
  startChat.style.bottom = "5px";
  startChat.onclick = () => {
  container.style.display = 'block';
  startChat.style.display = 'none';
  cancelBtn.style.display = 'block';
  };

  startImg = document.createElement("img");
  startImg.src = "https://raw.githubusercontent.com/createDiv1/Genesys-Cloud-Message-Form/refs/heads/main/createDIV1Form/img/downButton.png";
  startImg.style.width = "56px";
  startImg.style.height = "auto";
  startImg.alt = "Start Chat";
  startImg.style.border = "0px solid";
 startChat.appendChild(startImg);


 document.body.appendChild(container);
 document.body.appendChild(startChat);


container.addEventListener("submit", function(e){
  e.preventDefault();

  const fName = document.getElementById('fName').value;
  const lName = document.getElementById('lName').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;

  container.style.display = "none";
  cancelBtn.style.display = "none";

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

  Genesys("subscribe", "Messenger.ready", function () {
   Genesys("subscribe","Database.ready", function(){
    Genesys("command", "Database.update", {
      messaging: {
        customAttributes: {
          fName,
          lName,
          email,
          subject
        }
      }
    });
   });
   Genesys("command", "Messenger.open");

    Genesys('subscribe','Messenger.closed',function(){
      Genesys('command','Messenger.clear');
      location.reload(true);
    });
  });
});
