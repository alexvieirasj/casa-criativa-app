//usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require("./db");

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/1995/1995515.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit harum et ratione sint odio",
//         url: "https://rocketseat.com.br/"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/3043/3043283.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit harum et ratione sint odio",
//         url: "https://rocketseat.com.br/"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/3048/3048374.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit harum et ratione sint odio",
//         url: "https://rocketseat.com.br/"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/3093/3093979.svg",
//         title: "Karaoke",
//         category: "Diversão em Família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit harum et ratione sint odio",
//         url: "https://rocketseat.com.br/"
//     },
// ]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
});


//criei uma rota /
//e capturo o pedido do cliente para responder
server.get("/", function (req, res) {
       //Consulta dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reversedIdeas = [...rows].reverse(); //cria uma nova referencia para reverter

        let lastIdeas = [];
        for(let idea of reversedIdeas){ //reverte as ultimas para as primeiras
    
            if(lastIdeas.length < 2){
                lastIdeas.push(idea);
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas });
    });

});

server.get("/ideias", function (req, res) {
       //Consulta dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows){ 
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reversedIdeas = [...rows].reverse();

        return res.render("ideias.html", { ideas: reversedIdeas});
    });
    
});

server.post("/", function(req, res) {
      
    //Inserir dado na tabela
      const query = `
      INSERT INTO ideas(
          image,
          title,
          category,
          description,
          link
      ) VALUES (?,?,?,?,?);
      `;
  
      const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
      ];
  
      db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }
  
        return res.redirect("/ideias");
      });
});

//liguei meu servidor na porta 3000
server.listen(3000);