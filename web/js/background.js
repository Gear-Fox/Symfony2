//Variable Globale
var canvas;
var ctx;

window.onload = function() {start();};
window.onresize = function() {resise();};
window.onscroll = function() {scroll();};

var texture1;
var texture2;

/*

Pour auto generation des textures (mais plus lourd)

function init_txture(id_canvas,x,y){	
	tcanvas = document.getElementById(id_canvas);
	tctx = tcanvas.getContext('2d');
	tcanvas.style.opacity = '1';
	tcanvas.width = x;	
	tcanvas.height = y;	
	texture1 = new Image();
	texture2 = new Image();
}

function make_texture(texture,size,c1,c2){
	
	tctx.clearRect(0, 0, tcanvas.width,tcanvas.height);
	Xcenter=size;
	Ycenter=size;
	numberOfSides=6;
	angle=90;
	
	angle = (angle/180)*Math.PI;	
	var color = c1;	
	
	tctx.beginPath();
	tctx.moveTo (Xcenter +  size * Math.cos(0+angle), Ycenter +  size *  Math.sin(0+angle));
	for (var i = 1; i <= numberOfSides;i += 1) {
		tctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides + angle), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides + angle));
	}
	i=1;
	tctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides + angle), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides + angle));
	tctx.closePath();
	
	tctx.shadowColor = "#2E9AFE";
	tctx.shadowBlur = 4;
	tctx.shadowOffsetX = 1; 
	tctx.shadowOffsetY= 1;
	
	tctx.lineWidth = 1;
	tctx.lineJoin =  "bevel";
	tctx.fillStyle = color;
	tctx.fill();	
	tctx.strokeStyle =  c2;	
	tctx.stroke();	
	
	texture.src=tcanvas.toDataURL(1.0);
}
*/


function add_node(x,y,s,txt){
	if(s>0){
		var txt;		
		if (y%2 == 0){
			ctx.drawImage(txt,(x*92)-s,(y*80)-s,s*2,s*2);			
		}else{
			ctx.drawImage(txt,(x*92)+46-s,(y*80)-s,s*2,s*2);
		}	
	}
}


function initt(id_canvas){
	canvas = document.getElementById(id_canvas);
	ctx = canvas.getContext('2d');
	canvas.style.opacity = '0.8';
		
	var limity = Math.max(document.body.scrollHeight, document.body.offsetHeight,document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	var limitx = Math.max(document.body.scrollWidth, document.body.offsetWidth,document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
	set_size(limitx,limity);
	
	scroll();
}


function resise(){
	var limity = Math.max(document.body.scrollHeight, document.body.offsetHeight,document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	var limitx = Math.max(document.body.scrollWidth, document.body.offsetWidth,document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
	set_size(limitx,limity);	
	full();	
}


function set_size(x,y){	
	canvas.width = x;	
	canvas.height = y;	
}
	

function scroll(){
	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	canvas.style.top=-(top/4)+"px";
}


function hide_body(){
	document.getElementById("header").style.opacity = "0.95";
	document.getElementById("menu").style.opacity = "0.95";
	document.getElementById("content").style.opacity = "0.95";
	document.getElementById("footer").style.opacity = "0.95";
}


function show_body(op){
	background("rgba("+(255-(75/20)*(op-80))+","+(255-(25/20)*(op-80))+",255,255)");
	document.getElementById("header").style.opacity = ((op-10)/100);
	document.getElementById("menu").style.opacity = ((op-10)/100);
	document.getElementById("content").style.opacity = ((op-10)/100);
	document.getElementById("footer").style.opacity = ((op-10)/100);
}
	
	
function background(color){
	document.body.style.backgroundColor = color;
}


function click(e) {
    var x = Math.round((e.clientX/92));
    var y = Math.round((e.clientY/80));	
	full();	
	add_node(x,y,40,tab[x][y][1]);
}


function start(){	
	var x = document.referrer	
	
	//init_txture("canvas_txture",110,110);
	//make_texture(texture1,50,"#cdcdcd","#e3e1e1");
	//make_texture(texture2,50,"#f1f0f0","#cdcdcd");		
	texture1 = new Image();
	texture1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAaNklEQVR4nO2de3hU9ZnHB+QSwHCHcCfGmNuZ8zszGREjXrA+WlzLrpZi3fXSWiuu29qtLdWn211Nu7WVoqiRZOacM5MQRGxjKxASEkhIQjL3SzIzyUxmJjNJJgG8rwohl7nw3T/OmVwAqUUEJsz7PO+Tvyef5/d73+/7O8/7lUiu+MAESRmuSS/AVLITM9ILsCB7O1ZSqhDzTEX/d22eXkuHv2uow981ZGw/5nj0r6d+QtRYT0pwG10COqsEqQoW8zO3IFlShimSfEySSDDxcv+q8RvABMlGXEPlY4qCxXRqG+Zms1hMs0NZ63YO3FpvP7q/szM4qHf4B8p1bpTr3NDa/YOBzuDQftvxxjWlkR8QNdYRFqsZDhkZSixNLcHslK2YIcnHFMlGXCORYMLl/pnjKDBBko+Jkk2YnPcsptF/xByqBIuIBpkUh1W79R+83hHoPmFzdfVV6Nuxp6kd743Kcr0HJlfXgC/Q01945OO/MBweZTh8O4fFapkKNzBKLE19DbOX5GO6JB+TJPmJ0/c1AxMkwARJPial5iNpdQFmKljMJzyuo1nQLx36/MduX/Co29fdV2tqR7nWhXKtG/t1LlToXKjUuVCpa0OFzoX9OhdqzO1weoMDdk/Px5sr+/7A8PgurcLtchUY+XasJEospApxbWoJkiRluEaCxOm7gMBEST4mScowJXMLkhWvYL5MidQb1ZD+6G/9D5jcvRafv3vgiM0X2at1Y0+TG+VaNyp0LlTp21BjbEWt0YnDRicOGVpRbRAA7tO60WD1ne4IBIfqHcc8D7wzuJlw2ECrcbuUB6FYrEgvwAKxdk6VABMT1+dXCqGOSfIxJWUrZqSWYHaGEksZDhl3aJBXaz/2566u4IDR4e+v0LtQrhVOU6XOhWp9G2oMTtSZnDhidqDRbEeT2Y4jZgfqTQ7UGFtRrW9DpXgidQ7/UKAzOPRX8/H6PA0eI2qsk3GhVUQzmJnNYrGsBLPztmEaFat/iRP4JZEvnLJl2zAtjcUsuQZLZCrcQHFYpdF9/GJHIPhFs7v7ZJXBgz1NbuzTulCubcMBfRsOGVpRb3KiyWyHztICo7UFRmszTNZmGK0t0Fta0Gi2o94knMADujbs17pQafDA4uoeaPcHT22t+2QHUzT0CFGF10lVuJHhkCHlkSJ7DbPznsU0ySZMTtS/0QGhvU8tQRJViGuJ8uRC+faBlblFIL85+MXDTl9PoL2j+1S91YNy3UgNqxKBHTY6ccTkgNZsh8EiADOLabEJf03WZhgsLdCa7ThicuCw0YmDegFghc6Fw+Z2uHzdg7b2nvefeu/kCzI17qfVuJ2oIZUpkap4BfMzNUimYvIBmHAVX6GYIAEmxvRYBov50kIsp1nQG8v61ulcxxr9ge7BpmZveE+TC3u1buwT61i1oQ2HjU40mh3Qme0wWlpgEkFZrDZYrTbYbCNptdmGIcYANpgcqDU4Ua0X4JVr3ai3dkR8/u7QIfvR1m/vGvw5rcb9tAq3E+WQNHs7VlJqzKUKce3Vqf9G6bG1JUiSlWA2VdK3KGv7YMZtb+Omiub3NZ1dwQFLW2dfpcGNcrErrNS3CXXM2Ip6kwNNZjv0lhYYLS3C6bI2wypCsp0jrTYbLFYbzNZmGC0t0Jlb0Giyo97oQI1hpP4dMLhhaO0c9HcGh97Sf1BxkwaPSdnwPRSHVZQa6dksFqexmHV16T9Rj63NR5LsNcwmO7FQphq8gbCh3DcaPnzO4+/52Onp6qsyerBX68Yesb0fXccah4EJsCzWL4f19wE2DwOsEzvQA/o2lGtdqDZ60Nze3e/yBU/87tD/KXOUkYelPO6mOKyiCpGe+SaWpLGYtWwbpo1T/SfWg1h7r0HyTdsxT8FihVyFnJ/vP/k9m6e3tSMQ7K+3eob1WMUoYHWj6phevBbN1mZY/0Fo54Jnspxd/w4ZWlElXqH1Vg88Hd2DJvfR4BP7Bn5Nq3E/xeJWmgWtYLFCXowF41D/YYJkLSZJ8jElZSdmLFNjLsViRS6P7H/eHb673nG8urMrOKi1dwyW69rFbtGN/Vqhva8VgenMdhjMLTBZxKbjAoGdBVCsh1ax/hmtIwBrjU5R/7Vhn9aNIzZfuCMQHDrQ8r7lnl2hZ2Q8/kWmxhqihpTswrKsUswbB/pPHFPVj7T32SwWS1lcT/NQ/NV8/A1/Z8/JZldXX5XRPdwtjuixkWtRd2Ydu0jQRp++0c3LmfKhxuBEla4Vlbo2HDC4YWrrGvAFgoPF2g//Rjg8JOVxNylGbrYKN0h3I0VWgtlrS5CkYEX5EDcncJQey9QgmSrEIroIaXQRFC8f/vxpl7/n/TZfsO+gaeSElWvHXouNppgeu7gn7CtdoSJEozXWwDiG61+lTqh/VYZ22D3dA05fz2fPV514lRIBMmrIc9VIJzuxUMFi1r0FmHrl6z9Rj1EuTCE7MUOcKy7L4UA9sffUekv7UZs/EOxvbPZGBfHsGm48Dp5Dj5kuMbQzT2CsedGbW9BkEuTDYaMTB8UGRqh/Xnj93UPatqMd//bu4GaixnqKxa1yFXIULFbkqTGXKhsjH64k/SfoMYUVk/PKMC2r9MQ8prR/qbwYOXfvDt9R03Jsjz/QPaB3+Af2ad3YK+b+2FzR4ETDGcCstubh+nOpgH2VBkZnEUZotUZB/+3XulCua0dTiz/k7wyG3rN8oF1TGn2KqLBepsaaXB7Z0kIsX6bG3JSdmCHZiCmStTGAlxNYPiYqWExeW4Kk1bswkyixUMoOXs8oQ/K3DB+81BEIfmFv7z55QNRj5VoXKnRtOKBvHXUtOqCzCNC+ih671PCsVhss1pH6pxPrX53RgUN6J6r0rajQtaHK4IbZ1TXg8QdPKZs+eZvh8X2iwl00D4WUxfXZLBanvSzKh/qYfLjkAAU9ll6Aqem7MFNejAWripEm14B5ofbEE63e3m5XR/epGvOIHisXn1mEa9GBIyY7dOZRjYet+YqA9VVOoNE6ov8OGxw4qHcK9U/nRo3ZgzZfcMDu7f34Z+V9f2R4fJ/i8S26CAq6CGlUIRZlapB8ifXfyPR+QT6upbZhrrQQyxUssja+N3i30XW0KSCOqcp1rpFucVQdaxgz9bg8deyiwBOvzybz2fVvv86FxmZf1OvvHmpoPebeUDb4n0SN9bQGeTkcKMJjmYLFfLIVM6gyTPlm9Z/YLS7Jx/TU1zCb8FhGipC5hsdtFbbjuzq7ggPG1s5Twiu0qMfOU8fiCdhZAEfpP9MZ888agxNVIrx9wucTQx2BYOjPxvfrb9LgCaLCelqFPLkKOXINllBqzM0rwzSJNdZ9XjSAY6f30teRQt7EdTIOMtWRj573BoKfOtq7Tx4ytZ9zel8nDoOHoV3gqOpKy2H9Zx0ZXuss9jHyIdZ9VhnbYW3v7vcEevpeqf+cp9XYSHh8S8ZBRhcjjSixML0AMyUFmDrSfX7dyMek9AJMpd/GHKYUS6VFIJsr+/6txdPr9fq7++us3hE9pnMLdUzfOjK9t9hhtIrTe+u5p/fxnmMEvDjAPjLq+qzUu1Cuc6HG4oXL1z1oae89/uTeU78lfOR7jAZ3KljQ2WqsTC3B7CUspl+EwTUmppZ0JaXvwkz5dqz817Jwnq7tWHWgs3tAa/cN7te3D0/vD+jbUK0XPhkYU8esZ0w9xhm0MfBG1T/9qPpXGwOoE67QBpvwfHS49Zj9n3aHnmI0uIcUI1dajOUr3sackVeHC4Qm2YhrMjVIlu7uS9ljPfrfnV3BPmtbZ1+5rn2MHjsQG1MZBWDj6Ur8OgBH1z/h+UgYn+3XulChb4fe2TnYEQgOqps+eoeosF6uASMtxPIlLKZLWEy+sFMnPsFklWIeXTyY5vb3dDTZPNindWOPVjhplWdMPXTmM/TYVQbtTHiWMfBacOTM5yOdGw02L2ye3o+kqsgTDBu+U1o4lJ3GYlZqCZIuDFyZ8NiZ/dapxcyOIaq1o6ez1uzBHm079mjbUal3ocbYioYzBfQVrscuKUCrCNA28v1L7PWhRqx9h0weOLy9J2g2/BzDRR6QqkI3ZrCYT3ZixoVJhDJcszYfSasKsZywoVxHR293rcU7/AlBtaF1uMUfmd5fnSfsvPBsZzcveosd9SYHDhpaUWtuR4v3aB9ho79n+MgjlDq8hirBoswtSL4webAJk/O2YZpMiVRKGbrJ6esN1li8w9991BqdQsdoaRm+Fi/3P+lKz9EAtWY76kxO1FvcaPb0nmK46BZGFXlcXow75O8Ir+sX1l1uwmRFPqbTRYNphA/d7PD19tRYvCjXCqOrOqNz+DV6PLb43yg8azN04qlrsLrR7O3tZ9R4VcZFnszl8a3VPJZdHHAlArhaEdwBndBBxlr9BLR/DJzVJsiFI2YHGqwuNHt7+2kuuk3GRZ7MLb6I4GhNOC8Gbr9OBGdKgLuo4NjwazI+uukbBVelb0uAS4C7ujIBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk4zAS5OMwEuTjMBLk7zsoCrMXuHzR3qTQ4YEuAuCJzFKoBrEDcL2by9/TQfvfjghldCmb0o1wpbYOtMzgS4CwEnrkPUmVtGVkL5jp6iueirhI38WKHBnXmlWPq1wMWWsBE2tNrpOxqsMQvb8/ZrhSVs2sQStq8OzDbWQaTRbMdhkxN1FgEc4fEnhov8SKYMr12j+TpL2PIxaW0+khTswIrhtYdW37AD8CFDq+iYOLINNrHy8EugjdpbaYxdk2YHDhlb0WD1wNTe+znNRn9HK/GwjMMtq3cjJXMLki8M3EZcc+8zmJrNYjHDgdqp+6Ag0NkzYHAGIvu0blTqRhaNjl5LfzVvhj0LmO3sNb/De5pNrTA6O6K+QE/41bpPtTSL52Rq3E/zUChii0YvaF+laL9y03bMo4uQRlThu+7fPfhMtf2DFq8/GGps8Z2u1LsumpPieMsvW65db3LA0NIOjz8Y2Wv78Pi6t0O7aC76v4THExSLO3N5ZCtYzFpbgqQL2xArulNlapAs5ZEi4yAjqsF1hI38+Ol9J5XG9mMftnq7Q3UWz7AH94V4l463PJeVZ5PoxdpodcHp7Y4Y3cf6nvhbXx3NRljC4kWaw5NSFvdJeRDRBWS6gsXkfxzaaHgHMDW9ADOzlAOpTMEpeU4R7qU5/JBm8dzvDn1R7vH3DFjaOsMHDW5Uj/Yb+ApuweMtz3Q/1lmE/csNpjY0uzqj7o6e0IsHP7cRNrqD4cKvSrnwr6Vc6Ec0h3ulGtwoLcRySrAuE2xbvlbkY5KkAFNXFH0+J1ODJTncEEWpw2toFvcTFj/OKw6/sMPwkcHrD4YMjo5otSHmzy0YH40XW5bzwRrteGWwtEAnLsyuN7XC7PSd7ggEo2rtp4FbiyN/Iaro64SN/obmIk/KivEvhMdtchVyRI8iwe2q7KI4HQ8bISVRZbhWuhspUhbXUxxWSVncQ3ORhwmPnz3wTuiNg/b3A56OYLjB5hGtxs68PscXvDFr6keZJNUbHdA3u+Hx90QOtHzw0Xd2D1YSDkqpMvoSYaM/p5WRh5lifJvmoWA4ZJCdWJjGYhY1xiDwosQoz9MyTEsrw6zMN7EkW4UbqEKskvG4m1biYcLhP3+278SOZm/vZ05PV6jWJGxLrzWKAIetx+IX4Dm3msdcHY0OHLG0weHpjlg9R/uf3ntSS9goTzj8gWbxrEyJh4kK66Qq3MhwyKBKsIguwpy8Mkyj8jHlG/SUG2ULvQXJWdsxT67GSoYDRatxu5SLPEDz0U2ExX9tPfzpQY8/OGRxdUaqjW7Bb8cg+sbFqU/BaD0mtPhjr0VrWyDqC/RE/lD7meNGdXQnYaOvERa/oVlsYnh8l1bh9lweRPEGVsgLsGDYxVi4Gr9pHzlMkEAAmF6AqZkaJGewmJ9VglSihpQuCt/BKCMP0Gx00x07w78ts35s6wj0hPX2jmi1wSXWv/hyBjm3c4fgXFVvaoXZ4T3tC/RE3jJ8ErytNPwuzUULGA7/zbDRpwgX2UCrwrfn8iDy7VhJlFiYuQXJw77hl8W5UbRxWfYspqW+htnS3UhhSpFBFYZWEXV4nbQo8gjNRp996K+DRQ2tx3vdHcFQvdUTV1485/PK0drccHUEI3XO45898OfBAwwbZQmPl2gWzzJqPErUWJfNh25mtiNDLo6xLrFT43kCQvNC5WNKXhmm0UWYk82eWkyKBjOpwtAqosI6RoVHaA6/eL7q5Dutvt4TLe7OcK3ZfX73K9vl1X/nEtAxc78GSxta2ruiTl/v4M/LT+hpNqqhuejLDBf9BcMJwEgxVjOlyGBKsZQuwpyUrZgx4lJ1xTgTSyQSCSZKynBNegGmkp2YIS/AAvkrAyvlqhBDq3A74bCBVuOpVcV4oaDhkzpfIBgytQaiVQbXl/vNXSb9dy4/OOFadMLs9J32BXoibzR86lbw0V2Ei75O8+H/YbjovxMusoFhw3cqWNAyJVIVLOZnapA8qlu8Uv3Axe5TdHjM3IJkosRCuRor5RowNIc7CIcNDIun7tkZ/v1e64dtPn8wrGvxnf5Sh0frpblC/54Do0msY2XWj47d9VZ4D81F32S46AuEjT5NuMgGaQnW5paCEB7XyQuwYI0GyekFmLo2H5OE0dUVdcrOE6Knakw+yDVYwmxHBuFxc64a6xg1HqVV+MXj753i9a5jH7T6gqHD5vbL4qlqHc6zPU+brC60ersjWtfxLx5+t7+W5qIcxUf/yLDRXxJV5DEpG7kvZ3toNc0iS/EWFlNqzM3bhmkSNuZ5Gpcx4mKcshUz6CLBrvOmUmSQYqymOdxLVHiMYaO/zD/42Xsuf+8pm6szfNDo+sZdjM/2+B47vW8wt6LZ3Rl1dfSEnq86YaE5aBguuoXh8UvC4zEZi/sIi9XSQmRnvoklWX/AvGGX4Y3fpMvwJQ3h9FFlmJKpQbKCxXxZCVJzeRBGgzuJKvI9wkafXl0S/p1a95He6+8OGRz+yAH9N+cbbh3V3gvG7HY0mh2oMzlgcnhPe/3BiLLpY99qTWQ3YfEGw+N/CB99WqqMPCjlsZZRQi5TIpUosZAqxLWp+Ui6wuvYhYag/9aK+m+NBsnyYiygReN3ise3iAYbCI+n73tncGu1/UOfxx8MNTXHxmdi/TvTaPAfeH0YfcpiIyqtuQWNZjvqjCPPLfuaP/zwnrfDexge2wkbfZFwof+QKiMPMmz4TkYdkhMe10l5pKQXYObY9n5cnLLzRD4mSqyYnFeGaZQac+UaLJHyyM4pxmopF/kOYSM/IFx086Z9fTusnqOfOr3doZrz1D+r7e8b547RY5axdazR2gZH7Lnlvf46woNnOLxMOGymucgPZWzkPlqDPKJBJuGxbEWsvd8U13XsAiOm/8owhWzFjKxSzMsoxVKqeCiH8KGbGWXkO4TFD6RqbN5S/1mFJ9AzYHF1RQ6Nqn9HztnAjExgRuewHovNFcWpR7O7M9re0RN+ofrzZpqN7pCy0T8RFr+iOfxQxuOfaA3yFCyypIVYThdhTspOzJCMGQaP91P2pSHUv9QSJMUebcmbA9cxSsgpFndKuciDlCr6H3eUhF/abf7E0hHoCevsHaerxPGZcH3aobO0wCjWrJh8iM0VhW89RuuxVpicvtP+zp5Isf7//GuKI3+huWiBlI2+SLPRn9AsNhIV7pJxkK2KGazvwsxhPXbVnbIvjVGvD9swLb0AM6lCLKKLkMaoYwDxIM3iJxv/PPj6Yef7XR5/MNRojb2+j3w+oTPbYTC3wCB2oYZhAW1HvckJXXM73B3BSHXL+5+sf3uoknAopFX4Lc3iJ7QaG3NEYFIW15OdWKgoExyC19aLemx8dIsXO0T5sAmTU7ZixooizCE8lhENMqUcbmGU+A7N43HC41ebK06+0+Lt/cLh6QodMrWj2tA2Mj4TH3AFAT32uaXZ0zvw9L6+RsJDLWWjf6JZPEer8DilwvosFfIoFXLk72AJpcZcBYvpkjJMkeBqaDy+doh1Q3w+WlCIa6ltmCstxPLcQmRLOdzCcALAVerorwuOfFLrCwRDZldnJKb/asU3wMNGJw6b2mBp859u7+gJbzn8WatCg1LC4xVKjedoHo8TNdbTKuRRxchJ57Esq1TQY+kFmDqO9NglDnH6kl6AqWksZhElFuaqkS7jIJOqwndTXOQhmo3+9K4dQ1vetX7k8AWCIa2943SFzoUKnQsGh++0LxCMvG3+OHjbjvC7NIvtUhb5tBI/pTg8lKPCXYRFLv0a0qQ8UjI14nPL+NRjlziEt7+JChaT15YgSVGGWVIeKdmqwRsIG8qVqsJ3M6rI9xkWP33kb/2FOvexYy5vd8jl7Q4daTv+8YNl/XsIFy0kLPIZFZ6hODxEVLiLLoKCLkIaVYhFaS9j1rIyTJPUXy167JIGJkiAiVQZpihYTM945cR8wvcvYzhQUi58C1FjPc3jcVqNZ58/cKL0VwdO7iJs9E+MGi9IuehmmsfjRIX1DItbKRVyqDewYsXo55aL+61HIs4K8XvP9AJMJVsxI4PFfGkhljMcKFqFPIbDt2k1NhIe/8pwkUcJF9lAc7iX1iBPrkJO9naszNqOefM1SB7WY3E1vY/3iL0+iPJB0H+4jqghzeZxs7QYt5AS3CYrwSqaBU0XIS32NVVqPpKuzqnHFROi/mMxeVkZpmVqkJxVinnZb2Exo8RSaTGWU4VYlMFi/uoCzFxbgiQqf1xN7+M9hPonqRc6ULIVM8hOzBBfIqan5iNJwmJyQo9dkTH89dlE8Q1w0vB4Kh8TEycsEYlIRCISkYj4jP8HMlCuNG2RPBwAAAAASUVORK5CYII=";
	texture2 = new Image();
	texture2.src = "data:image/png;base64,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";
	
	initt("canvas");		
	annimation();	
}



var anim;
var mx;
var my;
var opa;
var tab = new Array();
function annimation(){
	
	mx = (Math.floor(canvas.width/92));
    my = (Math.floor(canvas.height/80));
	opa=80;
	
	x=0
	for (var x = 0; x <= mx; x+=1) {	
	
		tab[x]=new Array();		
		
		for (var y = 0; y <= my; y+=1) {
		
			tab[x][y]=new Array();
			tab[x][y][0]=0;
			if(Math.floor(Math.random()*2)==1){
				tab[x][y][1]=texture1;
			}else{
				tab[x][y][1]=texture2;
			}			
		}
	}	
	
	var val = 0;
	if (document.body.scrollWidth > 1550){
		val = 2;
	}else if (document.body.scrollWidth > 1300){
		val = 1;
	}
	for (var x = 0; x < val; x+=1) {
		tab[x][0][0] = 55;		
		tab[mx-x][0][0] = 55;		
	}
	annimation_req(0);
}


function full(){
	ctx.clearRect(0, 0, canvas.width,canvas.height);
	tab = new Array();
	
	mx = (Math.floor(canvas.width/92));
    my = (Math.floor(canvas.height/80));
	opa=80;
	
	x=0
	for (var x = 0; x <= mx; x+=1) {	
	
		tab[x]=new Array();		
		
		for (var y = 0; y <= my; y+=1) {
		
			tab[x][y]=new Array();
			tab[x][y][0]=0;
			if(Math.floor(Math.random()*2)==1){
				tab[x][y][1]=texture1;
			}else{
				tab[x][y][1]=texture2;
			}			
		}
	}	
	
	var val = 0;
	if (document.body.scrollWidth > 1550){
		val = 2;
	}else if (document.body.scrollWidth > 1300){
		val = 1;
	}
	for (var x = 0; x < val; x+=1) {
		tab[x][0][0] = 55;		
		tab[mx-x][0][0] = 55;		
	}
	annimation_req(1);
}


function annimation_req(full){	
	
	ctx.clearRect(0, 0, canvas.width,canvas.height);
	
	for (var x = 0; x <= mx; x+= 1) {
		for (var y = 1; y <= my; y+= 1) {
			tab[x][y][0]+=tab[x][y-1][0]/10;
		}
	}
	
	var full = 1;
	for (var x = 0; x <= mx; x+= 1) {
		for (var y = 0; y <= my; y+= 1) {
			if (tab[x][y][0]<50){
				full = 0;
			}
			if (tab[x][y][0]>55){
				tab[x][y][0] = 55;
			}
			
			add_node(x,y,tab[x][y][0],tab[x][y][1]);
			ctx.globalAlpha = 0.9;
		}
	}
	
	if (!full){
		setTimeout(function(){annimation_req();}, 50);
	}
	
}
