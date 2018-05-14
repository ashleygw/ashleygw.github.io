let obstacle;
let oArray = [];
let pArray = [];
let paArray = [];
let tick = -1;
let tickSpan;
let bat = 0;
let xsplit = 20;
let ysplit = 20;
let bestPlayer;
let totalPopulation = 400;
let highScore = 0;
let cycles = 10;
let generations = 0;
let pipesSpawned = 0;
let runBest = false;
let runBestButton;
let twoButton;
let oneButton;
let threeButton;
let forceButton;
let graphButton;
let brainButton;
let displayButton;
let saveButton;
let averageFitness = 0;
let showGame = true;
let fitGraph = [];
let showGraph = true;
let bestBrain = null;
let showBrain = false;
let showBrainAnalysis = false;
let maxDiff = 100;
let nodeSpan;
let numNodes;
let nodes = 8;
let resetButton;
// Well-trained brains
good_brain = NeuralNetwork.deserialize({"input_nodes":6,"hidden_nodes":8,"output_nodes":2,"weights_ih":{"rows":8,"cols":6,"data":[[-2.2072138065304294,-0.27300491896925283,0.4662918147886232,0.14083900799075996,2.783305746243764,0.8417864580215938],[-0.1785321592645946,-0.6862274291859533,-0.5683330287116234,-0.19366695392037364,-0.7063161049267495,-2.9230346632528974],[3.1615152903238046,0.381195107631475,1.1783130501765962,0.1761601695302769,-1.2816115434086137,-2.7343368856033035],[0.5233936063217683,-4.7420136574782505,1.0421162461442917,0.6497241026084437,-0.6695188889109867,-2.2460231599478724],[-3.541226089962505,-2.5827803432963132,0.16153896125808903,-0.5511412226590218,-0.7188921233404677,-1.3011467426871828],[-1.2077218783731691,-0.6982237713802557,2.4901246474089205,-1.401501540605069,-3.5396672640044278,-0.713034703855481],[0.45581970110992004,-1.327430586763753,2.428242267709567,1.0822300700092293,1.08931889221951,-1.2341636402504876],[0.4927274214063123,-0.15943921931719954,-1.7117475007104976,-0.24087828522132398,0.2306032969063857,0.12076470916230275]]},"weights_ho":{"rows":2,"cols":8,"data":[[-0.1759969465383308,1.6332943028465696,1.092606067427887,1.2178650682194827,-0.8472020992865794,0.13141814497708104,-0.8892467455271215,0.3943787948119325],[1.9979050716223548,-1.9615597558929319,-1.521115033993773,-0.9092650357121129,-1.7206784548893865,0.4686493748142102,-1.7663260772661047,-0.27344035832975433]]},"bias_h":{"rows":8,"cols":1,"data":[[0.19081391114063864],[1.1865899995322586],[-0.28202760685198464],[0.2080458691967919],[0.8388164632540883],[-1.1778997188333005],[3.623315135169639],[0.15671842043482265]]},"bias_o":{"rows":2,"cols":1,"data":[[-1.2598936067566693],[0.527848942341341]]},"learning_rate":0.1,"activation_function":{}});
good_brain_2 = NeuralNetwork.deserialize({"input_nodes":6,"hidden_nodes":8,"output_nodes":2,"weights_ih":{"rows":8,"cols":6,"data":[[-0.9407416258560231,1.0733396230690935,1.0535398795924447,-2.2705095491589184,1.2302193861718687,-1.5992965781003545],[-4.586581163434108,-0.9211855930559205,0.10912327294105678,0.4656315127339439,-0.8728422945616017,-3.177961163095732],[2.8823443651153577,0.1987805406044618,0.6819735987067891,-0.7242452815756185,-2.8473167867805476,-4.389899641580756],[-0.10682162736097445,-2.526246580910927,1.267252572552894,-2.8807534141486517,-1.5230482164574901,-0.0031902997601921945],[0.19163566325310621,-0.5960254929630184,0.07388628754385326,-2.077235689954258,-0.49505362105359285,-3.0552555040939273],[1.1856071956237277,2.6985295385106642,2.4274722591557656,0.1611484855791329,0.19902945283661605,-1.1912234101153916],[-1.0926859139267486,-0.4258802775124372,-1.326119674449345,-0.9076761009553207,-0.47149733177136566,1.998736115974682],[-1.2396269628617835,-1.3469247677315905,0.5712206295740285,-0.9101576322018894,-0.6756716719397744,1.3543340350549893]]},"weights_ho":{"rows":2,"cols":8,"data":[[-0.5715754295670967,-0.090475466657853,0.8833171567312779,3.972684873888352,-2.6640909012360305,-2.0379874833842697,-2.8483780385592725,-2.3430259789693895],[0.7526517336482166,-4.71018475120567,-2.1953531793628542,0.8033220245540539,-1.4870927780441063,-1.502007050199101,-1.1666641907657362,-0.5588692201538893]]},"bias_h":{"rows":8,"cols":1,"data":[[-1.7116419725207204],[-2.597639547763542],[1.1534183056181013],[-1.0907435752898467],[-1.6817914345098206],[-0.5321866021156584],[-1.3249593133368482],[1.4177412864652836]]},"bias_o":{"rows":2,"cols":1,"data":[[0.9573347894246964],[0.4579148815455625]]},"learning_rate":0.1,"activation_function":{}});
good_brain_3 = NeuralNetwork.deserialize({"input_nodes":6,"hidden_nodes":8,"output_nodes":2,"weights_ih":{"rows":8,"cols":6,"data":[[-1.0013655378531634,-2.5687573801530093,-1.2356860155830844,-1.8575675048677525,-0.24896344372991897,-3.614992619206198],[-1.4654084611245595,1.6538299813439288,-0.2807586324176115,-0.9813360367642553,2.0035275246134834,1.9475365042404817],[-0.1244099306624743,1.2363951724176176,1.607103089671941,-2.2160388603898333,0.6556898556461006,-0.37602669446039805],[2.8466448140370155,-0.17662968933592862,-0.30559410226355,0.3257052060737307,-3.047019998465932,-0.8216726369299925],[0.1448451731334789,3.65536722494565,1.9278299248240556,-1.0699960488152396,1.5734576360927195,-0.15639597086313106],[-0.24462598093982213,-2.2877153258611678,-1.6483951334687739,1.757161892390724,-0.1551147950639855,1.4141955520910723],[-1.2711080405236659,-0.4733225531149171,0.3050263522593555,1.8202801427569821,-1.5025185399626797,-2.756303335397474],[1.7337114203081319,2.193468720656758,-0.7082224793853428,-1.1348576011527665,-0.5213771759822747,-1.7972469669461422]]},"weights_ho":{"rows":2,"cols":8,"data":[[1.0514985377654114,-2.442245658497864,1.3814992557539634,-0.003876719738349965,-1.389659862284626,0.39482707385182264,-1.7010530850135352,0.13801328957447656],[-0.045689708617321134,2.488204355104465,1.834793354254784,-2.634970329179917,-1.8463957985098658,2.5369171668290313,0.5529414790122034,-2.007997250334763]]},"bias_h":{"rows":8,"cols":1,"data":[[3.641733806043392],[-1.2364205099191632],[-0.46851790198961446],[-1.2183236009186245],[-3.7147437724144465],[1.0236566460263445],[-1.468163379439082],[-1.280244445127388]]},"bias_o":{"rows":2,"cols":1,"data":[[3.77258925693422],[0.8099925141745815]]},"learning_rate":0.1,"activation_function":{}});


function setup() {
    createCanvas(700,400);
    strokeWeight(5);
    stroke('green');
    fitSpan = select('#fit');
    tickSpan = select('#tick');
    batSpan = select('#bat');
    genSpan = select('#gen');
    nodeSpan = select('#nodes');
    numNodes = select('#n');
    runBestButton = select('#best');
    twoButton = select('#two');
    twoButton.mousePressed(toggleTwo);
    threeButton = select('#three');
    threeButton.mousePressed(toggleThree);
    oneButton = select('#one');
    oneButton.mousePressed(toggleOne);
    forceButton = select('#force');
    forceButton.mousePressed(forceGen);
    graphButton = select('#graph');
    graphButton.mousePressed(toggleGraph);
    runBestButton.mousePressed(toggleBest);
    brainButton = select('#brain');
    brainButton.mousePressed(toggleBrain);
    displayButton = select('#display');
    displayButton.mousePressed(toggleDisplay);
    saveButton = select('#sav');
    saveButton.mousePressed(logBrain);
    resetButton = select('#reset');
    resetButton.mousePressed(rreset);
    for (let i = 0; i < totalPopulation; i++) {
        let player = new Player(xsplit,null,nodes);
        paArray[i] = player;
        pArray[i] = player;
    }
}
function rreset(){
    generations = 0;
    bestPlayer = null;
    bestBrain = null;
    paArray = [];
    pArray = [];
    oArray = [];
    tick = -1;
    highScore = 0;
    pipesSpawned = 0;
    averageFitness = 0;
    fitGraph = [];
    for (let i = 0; i < totalPopulation; i++) {
        let player = new Player(xsplit,null,nodes);
        paArray[i] = player;
        pArray[i] = player;
    }
}
function logBrain(){
    console.log(bestPlayer.brain.serialize());
}
function toggleDisplay(){
    if(showGame)
        cycles = 100;
    else
        cycles = 10;
    showGame = !showGame;
}
function toggleBrain(){
    showBrain = !showBrain;
}
function toggleGraph(){
    showGraph = !showGraph;
}
function toggleOne(){
    load(1);
}
function toggleTwo(){
    load(2);
}
function toggleThree(){
    load(3);
}
let input_nodes = null; 
let hidden_nodes = null; 
let output_nodes = null; 
let weights_ih = null; 
let weights_ho = null; 
let bias_h = null; 
let bias_o = null; 
let input_loc = null; 
let hidden_loc = null; 
let out_loc = null; 
let values_ih = null;
let values_ho = null;
let values_h = null;
let values_o = null;
let max_ih = null;
let min_ih = null;
let max_ho = null;
let min_ho = null;
let max_h = null;
let min_h = null;
let max_o = null;
let min_o = null;

function brain(){
    c = color(0);
    // Draw the input layer
    for(let i = 0; i < weights_ih["data"][0].length;++i)
    {
        ellipse(width / (weights_ih["data"][0].length + 1) * (i+1), input_loc, 50,50);
    }
    // Draw the hidden layer
    for(let i = 0; i < weights_ih["data"].length;++i)
    {
        c = color(map(bias_h["data"][i], min_h, max_h,0,255));
        stroke(c);
        ellipse(width / (weights_ih["data"].length + 1) * (i+1), hidden_loc, 50,50);
    }
    // Draw the output layer
    for(let i = 0; i < weights_ho["data"].length;++i)
    {
        c = color(map(bias_o["data"][i], min_o, max_o,0,255));
        stroke(c);
        ellipse(width / (weights_ho["data"].length + 1) * (i+1), out_loc, 50,50);
    }
    // Draw the weights from the input to hidden layer
    for(let i = 0; i < weights_ih["data"].length;++i)
    {
        for(let j = 0; j < weights_ih["data"][i].length;++j)
        {
            c = color(map(weights_ih["data"][i][j], min_ih, max_ih,0,255),180);
            stroke(c);
            line(width / (weights_ih["data"][0].length + 1) * (j+1), input_loc, width / (weights_ih["data"].length + 1) * (i+1), hidden_loc);
        }
    }
    // Draw weights from hidden to output layer
    for(let i = 0; i < weights_ho["data"].length;++i)
    {
        for(let j = 0; j < weights_ho["data"][i].length;++j)
        {
            c = color(map(weights_ho["data"][i][j], min_ih, max_ih,0,255),180);
            stroke(c);
            line(width / (weights_ho["data"][0].length + 1) * (j+1), hidden_loc, width / (weights_ho["data"].length + 1) * (i+1), out_loc);
        }
    }
}

function toggleBest() {
    runBest = !runBest;
    if (runBest) {
      resetGame();
      runBestButton.html('Train');
    } else {
      nextGeneration();
      runBestButton.html('Test best brain');
    }
}

function graph()
{
    xbin = width / (fitGraph.length+1);
    ybin = height/ Math.max.apply(Math,fitGraph);
    // p1x = 0;
    // p1y = 0;
    // p2x = 0;
    // p2y = 0;
    stroke('green');
    for(let i = 0; i < fitGraph.length - 1;i++)
    {
        // p1x = xbin * i;
        // p1y = height - fitGraph[i] * ybin;
        // p2x = xbin * i + xbin;
        // p2y = height - fitGraph[i+1] * ybin;
        line(xbin * i,height - fitGraph[i] * ybin,xbin * i + xbin,height - fitGraph[i+1] * ybin);
    }
}

function calcAveFitness(){
    sum = 0;
    for (let i = pArray.length - 1; i >= 0; i--)
        sum += pArray[i].score;
    averageFitness = sum / totalPopulation;
    return averageFitness;
}

function calculateBrain(){
    if(bestBrain){
        input_nodes = bestBrain["input_nodes"];
        hidden_nodes = bestBrain["hidden_nodes"];
        output_nodes = bestBrain["output_nodes"];
        weights_ih = bestBrain["weights_ih"];
        weights_ho = bestBrain["weights_ho"];
        bias_h = bestBrain["bias_h"];
        bias_o = bestBrain["bias_o"];
        input_loc = 4*height / 5;
        hidden_loc = 2.5 * height /5;
        out_loc = height/5;
        // Get min and max of everything for scaling.
        values_ih = weights_ih["data"].map(function(elt) { return elt[1]; });
        values_ho = weights_ho["data"].map(function(elt) { return elt[1]; });
        values_h = bias_h["data"].map(function(elt) { return elt[0]; });
        values_o = bias_o["data"].map(function(elt) { return elt[0]; });
        max_ih = Math.max.apply(null, values_ih);
        min_ih = Math.min.apply(null, values_ih);
        max_ho = Math.max.apply(null, values_ho);
        min_ho = Math.min.apply(null, values_ho);
        max_h = Math.max.apply(null,values_h);
        min_h = Math.min.apply(null,values_h);
        max_o = Math.max.apply(null, values_o);
        min_o = Math.min.apply(null, values_o);
    }
    
}
function forceGen(){
    paArray = [];
}
function load(brain){
    if (brain == 1){
        bestPlayer.brain = good_brain;
        bestBrain = good_brain;
    }
    else if (brain == 2){
        bestPlayer.brain = good_brain_2;
        bestBrain = good_brain_2;
    }
    else if (brain == 3){
        bestPlayer.brain = good_brain_3;
        bestBrain = good_brain_3;
    }
    calculateBrain();
}
function keyPressed() {
    if(key == "D"){
      if(showGame)
        cycles = 100;
      else
        cycles = 10;
      showGame = !showGame;
    }
    if(key == "G")
        showGraph = !showGraph;
    if(key == "B")
        showBrain = !showBrain;
    if(key == "A")
        showBrainAnalysis = !showBrainAnalysis;
    if(key == "S")
        console.log(bestPlayer.brain.serialize());
    if(key == "F")
        forceGen();
    if(key == "1")
        load(1);
    if(key == "2")
        load(2);
    if(key == "3")
        load(3);
}
function draw() {
    nodes = nodeSpan.value();
    for (let n = 0; n < cycles; n++) {
        // console.log(frameRate());
        tick += 1;
        background(51);
        if(showBrain)
            brain();
        tickSpan.html(tick);
        batSpan.html(highScore);
        genSpan.html(generations);
        fitSpan.html(averageFitness);
        numNodes.html(nodes);
        if(showGraph)
            graph();
        if(tick % (300 - min(maxDiff,pipesSpawned)) == 0){
            let w = 200; // Non randomized width allows for more specific brains
            let xloc = random(w/2,width - w/2);
            let inv = 30;
            let o = new Obstacle(w,xloc,inv,xsplit,ysplit);
            oArray.push(o);
            pipesSpawned+=1;
        }
        for (let i = oArray.length - 1; i >= 0; i--) {
            oArray[i].update(tick);
            if(showGame)
                oArray[i].display();
            if (oArray[i].yloc > height - 10) {
                oArray.splice(i, 1);
            }
        }
        if (runBest) {
            if(showGame)
                bestPlayer.display();
            bestPlayer.think();
            bestPlayer.update();
            if (bestPlayer.collision()) {
              resetGame();
            }
        }
        else
        {
            if(showGame)
                for(let i = 0; i < paArray.length; i++){
                    paArray[i].display();
                }
            for (let i = paArray.length - 1; i >= 0; i--) {
                let player = paArray[i];
                player.think();
                player.update();
                if(player.collision()){
                    paArray.splice(i, 1);
                }
            }
            if (paArray.length == 0) { 
                fitGraph.push(calcAveFitness());
                nextGeneration();
                generations++;
            }
            let tempHighScore = 0;
            let tempbestPlayer = null;
            for (let i = 0; i < paArray.length; i++) {
                let s = paArray[i].score;
                if (s > tempHighScore) {
                    tempbestPlayer = paArray[i];
                    tempHighScore = s;
                }
            }
            if (tempHighScore > highScore) {
                highScore = tempHighScore;
                if(tempbestPlayer != bestPlayer)
                    calculateBrain();
                bestPlayer = tempbestPlayer;
                bestBrain = JSON.parse(bestPlayer.brain.serialize());
            }else{
                tempHighScore = bestPlayer.score;
                if (tempHighScore > highScore) {
                    highScore = tempHighScore;
                }
            }
        }
    }
}
