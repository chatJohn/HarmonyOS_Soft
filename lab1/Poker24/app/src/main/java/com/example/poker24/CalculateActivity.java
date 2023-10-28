package com.example.poker24;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CalculateActivity extends Activity implements View.OnClickListener {

    public static final int FINAL_RESULT = 24;
    private ImageView cal_empty1;
    private ImageView cal_empty2;
    private ImageView cal_empty3;
    private ImageView cal_empty4;
    private ImageView cal_operator_empty1;
    private ImageView cal_operator_empty2;
    private ImageView cal_operator_empty3;
    private ImageView plus_operator;
    private ImageView minus_operator;
    private ImageView mul_operator;
    private ImageView divide_operator;
    private ImageView is_operator;
    private ImageView cal_del;
    List<Map<ImageView, Integer>> operator_fill = new ArrayList<>();

    private Pic2Num p2n = new Pic2Num();
    Map<Integer, Integer> p2numsMap = p2n.pic2num;
    List<Integer> nums = new ArrayList<>();
    private List<Integer> fill;
    private int a;
    private int b;
    private int c;
    private int d;
    private Integer operator_a;
    private Integer operator_b;
    private Integer operator_c;
    private Integer plus =  R.drawable.plus;
    private Integer minus = R.drawable.minus;
    private Integer mul = R.drawable.mul;
    private Integer divide = R.drawable.divide;;
    private ImageView result_image;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calculate);
        Intent intent = getIntent();
        fill = (List<Integer>) intent.getSerializableExtra("Data");
        findViews();
        fillOperations(fill);

    }

    private void fillOperations(List<Integer> fill) {
        cal_empty1.setImageResource(fill.get(0));
        cal_empty2.setImageResource(fill.get(1));
        cal_empty3.setImageResource(fill.get(2));
        cal_empty4.setImageResource(fill.get(3));
        for(Integer k: fill){
            nums.add(p2numsMap.get(k));
        }

    }

    private void findViews() {
        cal_empty1 = (ImageView) findViewById(R.id.cal_empty1);
        cal_empty2 = (ImageView) findViewById(R.id.cal_empty2);
        cal_empty3 = (ImageView) findViewById(R.id.cal_empty3);
        cal_empty4 = (ImageView) findViewById(R.id.cal_empty4);
        cal_operator_empty1 = (ImageView) findViewById(R.id.cal_operator_empty1);
        cal_operator_empty2 = (ImageView) findViewById(R.id.cal_operator_empty2);
        cal_operator_empty3 = (ImageView) findViewById(R.id.cal_operator_empty3);
        plus_operator = (ImageView) findViewById(R.id.plus_operator);
        minus_operator = (ImageView) findViewById(R.id.minus_operator);
        mul_operator = (ImageView) findViewById(R.id.mul_operator);
        divide_operator = (ImageView) findViewById(R.id.divide_operator);
        is_operator = (ImageView) findViewById(R.id.is_operator);
        cal_del = (ImageView) findViewById(R.id.cal_del);
        plus_operator.setOnClickListener(this);
        minus_operator.setOnClickListener(this);
        mul_operator.setOnClickListener(this);
        divide_operator.setOnClickListener(this);
        is_operator.setOnClickListener(this);
        cal_del.setOnClickListener(this);
        result_image = (ImageView) findViewById(R.id.result_image);
    }

    @Override
    public void onClick(View view) {
        int sz = operator_fill.size();
        if (view.getId() != R.id.cal_del && view.getId() != R.id.is_operator) {
            if(sz < 3){
                if(view.getId() == R.id.plus_operator){
                    AddOperators(sz, R.drawable.plus);
                }else if(view.getId() == R.id.minus_operator){
                    AddOperators(sz, R.drawable.minus);
                }else if(view.getId() == R.id.mul_operator){
                    AddOperators(sz, R.drawable.mul);
                }else if(view.getId() == R.id.divide_operator){
                    AddOperators(sz,R.drawable.divide);
                }
            }else{
                Toast.makeText(CalculateActivity.this, "三个运算符已经选择，请勿多选",Toast.LENGTH_LONG).show();
            }
        } else {
            if(view.getId() == R.id.cal_del){
                if(sz > 0){
                    if(sz == 3){
                        cal_operator_empty3.setImageResource(R.drawable.empty);
                    }else if(sz == 2){
                        cal_operator_empty2.setImageResource(R.drawable.empty);
                    }else if(sz == 1){
                        cal_operator_empty1.setImageResource(R.drawable.empty);
                    }
                    operator_fill.remove(sz - 1);
                }else{
                    Toast.makeText(CalculateActivity.this, "请添加运算符", Toast.LENGTH_LONG).show();
                }
            }else if(view.getId() == R.id.is_operator){
                if(sz < 3){
                    Toast.makeText(CalculateActivity.this, "请先添加运算符", Toast.LENGTH_LONG).show();
                }else{
                    a = nums.get(0);
                    b = nums.get(1);
                    c = nums.get(2);
                    d = nums.get(3);
                    List<Integer> operators = new ArrayList<>();
                    for (Map<ImageView, Integer> imageViewIntegerMap : operator_fill) {
                        operators.add((Integer) imageViewIntegerMap.values().toArray()[0]);
                    }
                    operator_a = operators.get(0);
                    operator_b = operators.get(1);
                    operator_c = operators.get(2);

                    if(operator_a.equals(plus) && operator_b.equals(plus) && operator_c.equals(plus)){
                        if(a + b + c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(plus) && operator_c.equals(minus)){
                        if(a + b + c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(plus) && operator_c.equals(mul)){
                        if(a + b + c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(plus) && operator_c.equals(divide)){
                        if (c % d == 0) {
                            if(a + b + c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }
                    else if(operator_a.equals(plus) && operator_b.equals(minus) && operator_c.equals(mul)){
                        if(a + b - c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(minus) && operator_c.equals(minus)){
                        if(a + b - c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(minus) && operator_c.equals(divide)){
                        if (c % d == 0) {
                            if(a + b - c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    } else if(operator_a.equals(plus) && operator_b.equals(minus) && operator_c.equals(plus)){
                        if(a + b - c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }



                    else if(operator_a.equals(plus) && operator_b.equals(mul) && operator_c.equals(plus)){
                        if(a + b * c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(mul) && operator_c.equals(minus)){
                        if(a + b * c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(mul) && operator_c.equals(mul)){
                        if(a + b * c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(mul) && operator_c.equals(divide)){
                        if (c % d  == 0) {
                            if(a + b * c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }


                    else if(operator_a.equals(plus) && operator_b.equals(divide) && operator_c.equals(plus)){
                        if (b % c == 0) {
                            if(a + b / c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(divide) && operator_c.equals(minus)){
                        if (b % c == 0) {
                            if(a + b / c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(divide) && operator_c.equals(mul)){
                        if (b % c == 0 || b * d % c == 0) {
                            if(a + b / c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(plus) && operator_b.equals(divide) && operator_c.equals(divide)){
                        if (b % c == 0 && (b / c) % d == 0) {
                            if(a + b / c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }
//                    减法


                    if(operator_a.equals(minus) && operator_b.equals(plus) && operator_c.equals(plus)){
                        if(a - b + c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(plus) && operator_c.equals(minus)){
                        if(a - b + c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(plus) && operator_c.equals(mul)){
                        if(a - b + c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(plus) && operator_c.equals(divide)){
                        if (c % d == 0) {
                            if(a - b + c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }
                    else if(operator_a.equals(minus) && operator_b.equals(minus) && operator_c.equals(mul)){
                        if(a - b - c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(minus) && operator_c.equals(minus)){
                        if(a - b - c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(minus) && operator_c.equals(divide)){
                        if (c % d == 0) {
                            if(a - b - c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    } else if(operator_a.equals(minus) && operator_b.equals(minus) && operator_c.equals(plus)){
                        if(a - b - c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }



                    else if(operator_a.equals(minus) && operator_b.equals(mul) && operator_c.equals(plus)){
                        if(a - b * c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(mul) && operator_c.equals(minus)){
                        if(a - b * c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(mul) && operator_c.equals(mul)){
                        if(a - b * c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(mul) && operator_c.equals(divide)){
                        if (c % d  == 0) {
                            if(a - b * c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }


                    else if(operator_a.equals(minus) && operator_b.equals(divide) && operator_c.equals(plus)){
                        if (b % c == 0) {
                            if(a - b / c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(divide) && operator_c.equals(minus)){
                        if (b % c == 0) {
                            if(a - b / c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(divide) && operator_c.equals(mul)){
                        if (b % c == 0 || b * d % c == 0) {
                            if(a - b / c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(minus) && operator_b.equals(divide) && operator_c.equals(divide)){
                        if (b % c == 0 && (b / c) % d == 0) {
                            if(a - b / c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }

//乘法

                    if(operator_a.equals(mul) && operator_b.equals(plus) && operator_c.equals(plus)){
                        if(a * b + c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(plus) && operator_c.equals(minus)){
                        if(a * b + c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(plus) && operator_c.equals(mul)){
                        if(a * b + c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(plus) && operator_c.equals(divide)){
                        if (c % d == 0) {
                            if(a * b + c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }
                    else if(operator_a.equals(mul) && operator_b.equals(minus) && operator_c.equals(mul)){
                        if(a * b - c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(minus) && operator_c.equals(minus)){
                        if(a * b - c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(minus) && operator_c.equals(divide)){
                        if (c % d == 0) {
                            if(a * b - c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    } else if(operator_a.equals(mul) && operator_b.equals(minus) && operator_c.equals(plus)){
                        if(a * b - c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }



                    else if(operator_a.equals(mul) && operator_b.equals(mul) && operator_c.equals(plus)){
                        if(a * b * c + d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(mul) && operator_c.equals(minus)){
                        if(a * b * c - d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(mul) && operator_c.equals(mul)){
                        if(a * b * c * d == FINAL_RESULT){
                            result_image.setImageResource(R.drawable.win);
                        }else{
                            result_image.setImageResource(R.drawable.joker);
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(mul) && operator_c.equals(divide)){
                        if ((a * b * c) % d  == 0 || (a * b) % d == 0 || a % d == 0) {
                            if(a * b * c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }


                    else if(operator_a.equals(mul) && operator_b.equals(divide) && operator_c.equals(plus)){
                        if ((a * b) % c == 0) {
                            if(a * b / c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(divide) && operator_c.equals(minus)){
                        if ((a * b) % c == 0) {
                            if(a * b / c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(divide) && operator_c.equals(mul)){
                        if ((a * b * d) % c == 0 ) {
                            if(a * b / c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(mul) && operator_b.equals(divide) && operator_c.equals(divide)){
                        if (a * b % c == 0 && (a * b / c) % d == 0) {
                            if(a * b / c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }
//除法

                    if(operator_a.equals(divide) && operator_b.equals(plus) && operator_c.equals(plus)){
                        if (a % b == 0) {
                            if(a / b + c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(plus) && operator_c.equals(minus)){
                        if (a % b == 0) {
                            if(a / b + c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(plus) && operator_c.equals(mul)){
                        if (a % b == 0) {
                            if(a / b + c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(plus) && operator_c.equals(divide)){
                        if (a % b == 0 && c % d == 0) {
                            if(a / b + c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }
                    else if(operator_a.equals(divide) && operator_b.equals(minus) && operator_c.equals(mul)){
                        if (a % b == 0) {
                            if(a / b - c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(minus) && operator_c.equals(minus)){
                        if (a % b == 0) {
                            if(a / b - c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(minus) && operator_c.equals(divide)){
                        if (a % b == 0 && c % d == 0) {
                            if(a / b - c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        }else{
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    } else if(operator_a.equals(divide) && operator_b.equals(minus) && operator_c.equals(plus)){
                        if (a % b == 0) {
                            if(a / b - c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }



                    else if(operator_a.equals(divide) && operator_b.equals(mul) && operator_c.equals(plus)){
                        if (a * c % b == 0) {
                            if(a / b * c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(mul) && operator_c.equals(minus)){
                        if ((a * c) % b == 0) {
                            if(a / b * c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(mul) && operator_c.equals(mul)){
                        if ((a * c * d) % b == 0) {
                            if(a / b * c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(mul) && operator_c.equals(divide)){
                        if ((a  * c) % (b * d)  == 0 || (a * b) % d == 0 || a % d == 0) {
                            if(a / b * c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }


                    else if(operator_a.equals(divide) && operator_b.equals(divide) && operator_c.equals(plus)){
                        if ( a % b == 0&&(a * b) % c == 0) {
                            if(a / b / c + d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(divide) && operator_c.equals(minus)){
                        if (a % b == 0 && (a / b) % c == 0) {
                            if(a / b / c - d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(divide) && operator_c.equals(mul)){
                        if ((a * d) % (c * b) == 0 ) {
                            if(a / b / c * d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }else if(operator_a.equals(divide) && operator_b.equals(divide) && operator_c.equals(divide)){
                        if (a % b == 0 && a/b % c ==0 && (a / b / c) % d == 0) {
                            if(a / b / c / d == FINAL_RESULT){
                                result_image.setImageResource(R.drawable.win);
                            }else{
                                result_image.setImageResource(R.drawable.joker);
                            }
                        } else {
                            Toast.makeText(CalculateActivity.this, "除法必须除尽", Toast.LENGTH_LONG).show();
                        }
                    }


                }
            }
        }

    }

    private void AddOperators(int sz, Integer b) {
        if(sz == 0){
            cal_operator_empty1.setImageResource(b);
            PairAdd(cal_operator_empty1, b);
        }else if(sz == 1){
            cal_operator_empty2.setImageResource(b);
            PairAdd(cal_operator_empty2, b);
        }else if(sz == 2){
            cal_operator_empty3.setImageResource(b);
            PairAdd(cal_operator_empty3, b);
        }
    }

    private void PairAdd(ImageView a, Integer b) {
        Map<ImageView, Integer> tmp = new HashMap<>();
        tmp.put(a, b);
        operator_fill.add(tmp);
    }
}
