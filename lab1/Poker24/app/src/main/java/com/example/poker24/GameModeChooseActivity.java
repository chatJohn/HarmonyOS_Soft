package com.example.poker24;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.annotation.Nullable;

public class GameModeChooseActivity extends Activity implements View.OnClickListener {

    private Button mode1;
    private Button mode2;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choosemode);
        findViews();


    }

    private void findViews() {
        mode1 = (Button) findViewById(R.id.mode1);
        mode2 = (Button) findViewById(R.id.mode2);
        mode1.setOnClickListener(this);
        mode2.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if(view.getId() == R.id.mode1){
            showDialog(view);
        }else if(view.getId() == R.id.mode2){
            showDialog(view);
        }
    }



    public void showDialog(View view){
        AlertDialog.Builder builder=new AlertDialog.Builder(this);
        if(view.getId() == R.id.mode1){
            builder.setTitle("游戏介绍");
            builder.setMessage("页面中将会出现52张扑克牌，通过点击的方式选出4张扑克牌并放置在界面某一个地方，位置由玩家自己确定，" +
                    "然后选择加减乘除进行计算得到24，除法必须能够除尽");
            builder.setPositiveButton("进入游戏", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    startActivity(new Intent(GameModeChooseActivity.this, GameActivity.class));
                }
            });
            AlertDialog dialog=builder.create();
            dialog.show();
        }else if(view.getId() == R.id.mode2){
            builder.setTitle("游戏介绍");

            builder.setMessage("页面中将会出现52张扑克牌，通过点击的方式选出4张扑克牌并放置在界面某一个地方，位置由玩家自己确定");
            builder.setPositiveButton("进入游戏", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    startActivity(new Intent(GameModeChooseActivity.this, GameMode2Activity.class));
                }
            });
            AlertDialog dialog=builder.create();
            dialog.show();
        }
    }
}
