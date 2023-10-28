package com.example.poker24;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CalculateMode2Activity extends Activity implements View.OnClickListener {


    private ImageView mode2_cal_emp1;
    private ImageView mode2_cal_emp2;
    private ImageView mode2_cal_emp3;
    private ImageView mode2_cal_emp4;

    private List<Integer> fill;
    List<Integer> nums = new ArrayList<>();
    private Pic2Num p2n = new Pic2Num();
    Map<Integer, Integer> p2numsMap = p2n.pic2num;
    private TextView res_text;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mode2cal);
        findViews();
        Intent intent = getIntent();
        fill = (List<Integer>) intent.getSerializableExtra("Data");
        fillOperations(fill);
        int[] numss = {nums.get(0), nums.get(1), nums.get(2), nums.get(3)};
        calculate cal = new calculate(numss);
        cal.compute();
        ArrayList<String> re = cal.results;
        Set<String> res = new HashSet<String>();
        for (String s : re) {
            res.add(s);
        }
        for (String r : res) {
            res_text.append(r);
            res_text.append("\n");
        }
    }

    private void findViews() {
        mode2_cal_emp1 = (ImageView) findViewById(R.id.mode2cal_empty1);
        mode2_cal_emp2 = (ImageView) findViewById(R.id.mode2cal_empty2);
        mode2_cal_emp3 = (ImageView) findViewById(R.id.mode2cal_empty3);
        mode2_cal_emp4 = (ImageView) findViewById(R.id.mode2cal_empty4);
        res_text = (TextView) findViewById(R.id.resShow);
    }

    private void fillOperations(List<Integer> fill) {
        mode2_cal_emp1.setImageResource(fill.get(0));
        mode2_cal_emp2.setImageResource(fill.get(1));
        mode2_cal_emp3.setImageResource(fill.get(2));
        mode2_cal_emp4.setImageResource(fill.get(3));
        for(Integer k: fill){
            nums.add(p2numsMap.get(k));
        }
    }
    @Override
    public void onClick(View view) {

    }
}
