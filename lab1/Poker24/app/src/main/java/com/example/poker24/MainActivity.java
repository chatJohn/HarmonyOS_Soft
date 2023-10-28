package com.example.poker24;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private Button start_beginGame;
    private Button start_introduction;
    private Button start_author;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViews();

    }

    private void findViews() {
        start_beginGame = (Button) findViewById(R.id.start_begin);
        start_introduction = (Button) findViewById(R.id.start_introduction);
        start_author = (Button) findViewById(R.id.start_author);

        doClicking();
    }

    private void doClicking() {
        start_beginGame.setOnClickListener(this);
        start_introduction.setOnClickListener(this);
        start_author.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if(view.getId() == R.id.start_begin){
            Intent intent = new Intent(MainActivity.this, GameModeChooseActivity.class);
            startActivity(intent);
        }else if(view.getId() == R.id.start_introduction){
            showDialog(view);
        }else if(view.getId() == R.id.start_author){
            showDialog(view);
        }
    }

    public void showDialog(View view){
        AlertDialog.Builder builder=new AlertDialog.Builder(this);
        if(view.getId() == R.id.start_introduction){
            builder.setTitle("游戏介绍");

            builder.setMessage("页面中将会出现52张扑克牌，通过点击的方式选出4张扑克牌并放置在界面某一个地方，位置由玩家自己确定，" +
                    "然后利用加减乘除进行计算得到24，除法必须能够除尽");
            builder.setPositiveButton("我知道了", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            AlertDialog dialog=builder.create();
            dialog.show();
        }else if(view.getId() == R.id.start_author){
            builder.setTitle("作者介绍");
            builder.setMessage("author: chatVege\nemail: 1059257007");
            builder.setPositiveButton("我知道了", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            AlertDialog dialog=builder.create();
            dialog.show();
        }
    }
}