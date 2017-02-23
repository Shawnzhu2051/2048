var board = new Array();
var score;

function newGame()
{
	score = 0;
	init(); //初始化棋盘格
 	generateOneNumber(); //在随机两个数字
 	generateOneNumber();
 	updateBoardView();	
}

function init()
{
	for(var i = 0; i<4;i++)
	{
    	board[i] = new Array();
   		for(var j = 0;j<4;j++)
   		{
        	board[i][j] = 0;
    	}
	}
}
function  updateBoardView()//通知前端对board二位数组进行设定。
{
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++)
	{
		for (var j = 0; j < 4; j++) 
		{
			$("#chessboard").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			var top = getPosTop(i,j);
			var left = getPosLeft(i,j);
			if(board[i][j] == 0)
			{
				theNumberCell.css
				({
					height:0,					
					width:0,
					top:top+65,
					left:left+65,
					fontSize:0,
				});
			}
			else
			{
				theNumberCell.text(board[i][j]);
				var color = setColorByNumber(board[i][j]);
				theNumberCell.css
				({
					height:110,
					width:110,
					top:top,
					left:left,
					background:color,
					fontSize:60,
				})
				if(board[i][j] >= 8)
				{
					theNumberCell.css({
						color: '#fff',
					})
				}
				if(board[i][j] >= 16)
				{
					theNumberCell.css({
						fontSize: 50,
					})
				}
			
			}	
		};
	}
	CountScore();
	bestscore(score);
}	

function generateOneNumber()
{
	if (nospace())
	{ 
       return false;
	} 
	//随机一个位置
	while(true)
	{
		var randx = parseInt(Math.floor(Math.random()*4));
	    var randy = parseInt(Math.floor(Math.random()*4));
	    if(board[randx][randy] == 0) 
	        {
	        	break;
	        }
	}
	//随机一个数字
	var randNumber = Math.random()<0.8 ?2 : 4;
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}
function moveLeft() 
{
	if (!canMoveLeft()) 
	{
		console.log('cannot move left');
		return false;
	}
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 1; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{					 
            	for(var k = 0;k<j;k++)//(i,j)左侧的元素
            	{
               		//位置是为空 && 中间没有障碍物
                	if(board[i][k] == 0 && noBlockHorizontal(i , k, j))
                	{
						changePositionAnimate(i,j,i,k);
                	   	board[i][k] = board[i][j];
                	    board[i][j] = 0;
                	   break;
                	}
                	//位置和本来的数字相等 && 中间没有障碍物
                	else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j))
                	{
                	    changePositionAnimate(i,j,i,k);						
                	    board[i][k] += board[i][j];
                	    score += board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
            	}
  			}		
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight() 
{
	if (!canMoveRight()) 
	{
		return false;
	}
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 2; j >= 0; j--) 
		{
			if (board[i][j] != 0) 
			{					 
            	for(var k = 3;k>j;k--)//(i,j)右侧的元素
            	{
               		//位置是为空 && 中间没有障碍物
                	if(board[i][k] == 0 && noBlockHorizontal(i,j,k))
                	{
						changePositionAnimate(i,j,i,k);
                	   	board[i][k] = board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
                	//位置和本来的数字相等 && 中间没有障碍物
                	else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k))
                	{
                		changePositionAnimate(i,j,i,k);
                	    board[i][k] += board[i][j];
                	    score += board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
            	}
  			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp() 
{
	if (!canMoveUp()) 
	{
		return false;
	}
	for (var i = 1; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{					 
            	for(var k = 0;k<i;k++)//(i,j)上侧的元素
            	{
               		//位置是为空 && 中间没有障碍物
                	if(board[k][j] == 0 && noBlockVertical(j , k, i))
                	{
						changePositionAnimate(i,j,k,j);
                	   	board[k][j] = board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
                	//位置和本来的数字相等 && 中间没有障碍物
                	else if(board[k][j] == board[i][j] && noBlockVertical(j , k, i))
                	{
                		changePositionAnimate(i,j,k,j);
                	    board[k][j] += board[i][j];
                	    score += board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
            	}
  			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown() 
{
	if (!canMoveDown()) 
	{
		return false;
	}
	for (var i = 2; i >= 0; i--) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{					 
            	for(var k = 3;k>i;k--)//(i,j)下侧的元素
            	{
               		//位置是为空 && 中间没有障碍物
                	if(board[k][j] == 0 && noBlockVertical(j,i,k))
                	{
                		changePositionAnimate(i,j,k,j);
                	   	board[k][j] = board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
                	//位置和本来的数字相等 && 中间没有障碍物
                	else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k))
                	{
                		changePositionAnimate(i,j,k,j);
                	    board[k][j] += board[i][j];
                	    score += board[i][j];
                	    board[i][j] = 0;
                	    break;
                	}
            	}
  			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function canMoveLeft() 
{
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 1; j < 4; j++) 
		{
			if(board[i][j] != 0) 
			{
				if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) 
					{
						return true; 
					}
            }
        }
    }
	return false;
}

function canMoveRight() 
{
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 2; j >= 0; j--) 
		{
			if(board[i][j] != 0) 
			{
				if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) 
					{
						return true; 
					}
            }
        }
    }
	return false;
}

function canMoveUp() 
{
	for (var i = 1; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if(board[i][j] != 0) 
			{
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) 
					{
						return true; 
					}
            }
        }
    }
	return false;
}

function canMoveDown() 
{
	for (var i = 2; i >= 0; i--) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if(board[i][j] != 0) 
			{
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) 
					{
						return true; 
					}
            }
        }
    }
	return false;
}

function isgameover()
{
	if(nospace()&&nomove())
	{
		gameover();
	}
}

function gameover()
{
	$('#gameover').css({
		'display':'inline',
		'opacity':0.8,
	})
}

function noBlockHorizontal(row, col1, col2) 
{
	for (var j = col1 + 1; j < col2; j++) 
	{
		if (board[row][j] != 0) 
		{
			return false;
    	}
	}
	return true;
}

function noBlockVertical(col,row1,row2)
{
	for (var i = row1 + 1; i < row2; i++) 
	{
		if (board[i][col] != 0) 
		{
			return false;
    	}
	}
	return true;
}

function getPosTop(i, j) 
{
    return (130 + i * 125);
}

function getPosLeft(i, j) 
{
    return (55 + j * 125);
}
//在随机生成数字的时候判断16宫格中是否还有空间
function nospace() 
{
	for ( var i = 0; i < 4; i++)
	{
		for ( var j = 0; j < 4; j++)
		{
        	if (board[i][j] == 0)
        	{
            	return false;
            }
        }
    }	
	return true;
}

function nomove()
{
	if(canMoveLeft())
	{
    	return false;
    }
    if(canMoveRight())
	{
    	return false;
    }
    if(canMoveUp())
	{
    	return false;
    }
    if(canMoveDown())
	{
    	return false;
    }
	return true;
}

function CountScore()
{
	$('#scorenumber').text(score);
}

function setColorByNumber(Num)
{
	switch(Num)
	{
		case 2:
		{
			return '#eee4da';
			break;
		}
		case 4:
		{
			return '#ede0c8';
			break;
		}
		case 8:
		{
			return '#f26179';
			break;
		}
		case 16:
		{
			return '#f59563';
			break;
		}
		case 32:
		{
			return '#f67c5f';
			break;
		}
		case 64:
		{
			return '#f65e36';
			break;
		}
		case 128:
		{
			return '#edcf72';
			break;
		}
		case 256:
		{
			return '#edcc61';
			break;
		}
		case 512:
		{
			return '#9c0';
			break;
		}
		case 1024:
		{
			return '#3365a5';
			break;
		}
		case 2048:
		{
			return '#09c';
			break;
		}
	}
}

//事件响应循环 主逻辑
$(document).ready(function(e)
{
 	newGame();
});

function changePositionAnimate(fromX,fromY,toX,toY)
{
	var cell = $('#number-cell-'+fromX+'-'+fromY);
    cell.css({
    	top:getPosTop(toX,toY),
   	 	left:getPosLeft(toX,toY)
   	});
}

function showNumberWithAnimation(i, j, randNumber) 
{
     var numberCell = $('#number-cell-' + i + '-' + j);
     numberCell.css("background-color", setColorByNumber(randNumber));
     numberCell.text(randNumber);
     top_dis = getPosTop(i, j) +70;
     left_dis = getPosLeft(i, j) + 70;
     numberCell.css
     ({
         width : "110px",
         height : "110px",
         top :  getPosTop(i, j),
         left : getPosLeft(i, j),
     });
 }
 function bestscore(now_score)
 {
 	$('#bestnumber').text(12742);
 }
 

$(document).keydown(function (event) {
	switch (event.keyCode) {
		case 37://left
		{
			if(moveLeft()){
				generateOneNumber();
				isgameover();
			}	
			break		
		}
		case 38://up;
		{
			if(moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;
		}
		case 39://right
		{
			if(moveRight()){
				generateOneNumber();
				isgameover();

			}
			break;
			
		}
		case 40://down
		{
			if(moveDown()){
				generateOneNumber();
				isgameover();			
			}
			break;
		}
		default :
		{
			break;
		}
 	}
});
$('.restart').bind('click',function()
{
	newGame();
	$('#gameover').css({
		'display': 'none',
	})
})
$('#best').bind('click',function()
{
	gameover();
})