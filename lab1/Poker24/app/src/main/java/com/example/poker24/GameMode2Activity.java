package com.example.poker24;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class GameMode2Activity extends Activity implements View.OnClickListener {

    private ImageView empty1;
    private ImageView empty2;
    private ImageView empty3;
    private ImageView empty4;
    private ImageView mh1;
    private ImageView mh2;
    private ImageView mh3;
    private ImageView mh4;
    private ImageView mh5;
    private ImageView mh6;
    private ImageView mh7;
    private ImageView mh8;
    private ImageView mh9;
    private ImageView mh10;
    private ImageView mh11;
    private ImageView mh12;
    private ImageView mh13;
    private ImageView ht1;
    private ImageView ht2;
    private ImageView ht3;
    private ImageView ht4;
    private ImageView ht5;
    private ImageView ht6;
    private ImageView ht7;
    private ImageView ht8;
    private ImageView ht9;
    private ImageView ht10;
    private ImageView ht11;
    private ImageView ht12;
    private ImageView ht13;
    private ImageView hx1;
    private ImageView hx2;
    private ImageView hx3;
    private ImageView hx4;
    private ImageView hx5;
    private ImageView hx6;
    private ImageView hx7;
    private ImageView hx8;
    private ImageView hx9;
    private ImageView hx10;
    private ImageView hx11;
    private ImageView hx12;
    private ImageView hx13;
    private ImageView fk1;
    private ImageView fk2;
    private ImageView fk3;
    private ImageView fk4;
    private ImageView fk5;
    private ImageView fk6;
    private ImageView fk7;
    private ImageView fk8;
    private ImageView fk9;
    private ImageView fk10;
    private ImageView fk11;
    private ImageView fk12;
    private ImageView fk13;

    int cnt = 0;
    private ImageButton go2Cal;
    private ImageButton del;
    private ImageButton right_arrow;
    private ImageButton left_arrow;

    private List<Map<ImageView, Integer>> fill = new ArrayList<>();
    private List<Integer> trans = new ArrayList<>();
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        findViews();
        doClicking();
    }

    private void findViews() {
        empty1 = (ImageView) findViewById(R.id.empty1);
        empty2 = (ImageView) findViewById(R.id.empty2);
        empty3 = (ImageView) findViewById(R.id.empty3);
        empty4 = (ImageView) findViewById(R.id.empty4);

        mh1 = (ImageView) findViewById(R.id.mh1);
        mh2 = (ImageView) findViewById(R.id.mh2);
        mh3 = (ImageView) findViewById(R.id.mh3);
        mh4 = (ImageView) findViewById(R.id.mh4);
        mh5 = (ImageView) findViewById(R.id.mh5);
        mh6 = (ImageView) findViewById(R.id.mh6);
        mh7 = (ImageView) findViewById(R.id.mh7);
        mh8 = (ImageView) findViewById(R.id.mh8);
        mh9 = (ImageView) findViewById(R.id.mh9);
        mh10 = (ImageView) findViewById(R.id.mh10);
        mh11 = (ImageView) findViewById(R.id.mh11);
        mh12 = (ImageView) findViewById(R.id.mh12);
        mh13 = (ImageView) findViewById(R.id.mh13);

        ht1 = (ImageView) findViewById(R.id.ht1);
        ht2 = (ImageView) findViewById(R.id.ht2);
        ht3 = (ImageView) findViewById(R.id.ht3);
        ht4 = (ImageView) findViewById(R.id.ht4);
        ht5 = (ImageView) findViewById(R.id.ht5);
        ht6 = (ImageView) findViewById(R.id.ht6);
        ht7 = (ImageView) findViewById(R.id.ht7);
        ht8 = (ImageView) findViewById(R.id.ht8);
        ht9 = (ImageView) findViewById(R.id.ht9);
        ht10 = (ImageView) findViewById(R.id.ht10);
        ht11 = (ImageView) findViewById(R.id.ht11);
        ht12 = (ImageView) findViewById(R.id.ht12);
        ht13 = (ImageView) findViewById(R.id.ht13);

        hx1 = (ImageView) findViewById(R.id.hx1);
        hx2 = (ImageView) findViewById(R.id.hx2);
        hx3 = (ImageView) findViewById(R.id.hx3);
        hx4 = (ImageView) findViewById(R.id.hx4);
        hx5 = (ImageView) findViewById(R.id.hx5);
        hx6 = (ImageView) findViewById(R.id.hx6);
        hx7 = (ImageView) findViewById(R.id.hx7);
        hx8 = (ImageView) findViewById(R.id.hx8);
        hx9 = (ImageView) findViewById(R.id.hx9);
        hx10 = (ImageView) findViewById(R.id.hx10);
        hx11 = (ImageView) findViewById(R.id.hx11);
        hx12 = (ImageView) findViewById(R.id.hx12);
        hx13 = (ImageView) findViewById(R.id.hx13);

        fk1 = (ImageView) findViewById(R.id.fk1);
        fk2 = (ImageView) findViewById(R.id.fk2);
        fk3 = (ImageView) findViewById(R.id.fk3);
        fk4 = (ImageView) findViewById(R.id.fk4);
        fk5 = (ImageView) findViewById(R.id.fk5);
        fk6 = (ImageView) findViewById(R.id.fk6);
        fk7 = (ImageView) findViewById(R.id.fk7);
        fk8 = (ImageView) findViewById(R.id.fk8);
        fk9 = (ImageView) findViewById(R.id.fk9);
        fk10 = (ImageView) findViewById(R.id.fk10);
        fk11 = (ImageView) findViewById(R.id.fk11);
        fk12 = (ImageView) findViewById(R.id.fk12);
        fk13 = (ImageView) findViewById(R.id.fk13);


        left_arrow = (ImageButton) findViewById(R.id.left_arrow);
        right_arrow = (ImageButton) findViewById(R.id.right_arrow);
        del = (ImageButton) findViewById(R.id.del);
        go2Cal = (ImageButton) findViewById(R.id.go2cal);
    }

    private void doClicking() {
        mh1.setOnClickListener(this);
        mh2.setOnClickListener(this);
        mh3.setOnClickListener(this);
        mh4.setOnClickListener(this);
        mh5.setOnClickListener(this);
        mh6.setOnClickListener(this);
        mh7.setOnClickListener(this);
        mh8.setOnClickListener(this);
        mh9.setOnClickListener(this);
        mh10.setOnClickListener(this);
        mh11.setOnClickListener(this);
        mh12.setOnClickListener(this);
        mh13.setOnClickListener(this);

        ht1.setOnClickListener(this);
        ht2.setOnClickListener(this);
        ht3.setOnClickListener(this);
        ht4.setOnClickListener(this);
        ht5.setOnClickListener(this);
        ht6.setOnClickListener(this);
        ht7.setOnClickListener(this);
        ht8.setOnClickListener(this);
        ht9.setOnClickListener(this);
        ht10.setOnClickListener(this);
        ht11.setOnClickListener(this);
        ht12.setOnClickListener(this);
        ht13.setOnClickListener(this);

        hx1.setOnClickListener(this);
        hx2.setOnClickListener(this);
        hx3.setOnClickListener(this);
        hx4.setOnClickListener(this);
        hx5.setOnClickListener(this);
        hx6.setOnClickListener(this);
        hx7.setOnClickListener(this);
        hx8.setOnClickListener(this);
        hx9.setOnClickListener(this);
        hx10.setOnClickListener(this);
        hx11.setOnClickListener(this);
        hx12.setOnClickListener(this);
        hx13.setOnClickListener(this);

        fk1.setOnClickListener(this);
        fk2.setOnClickListener(this);
        fk3.setOnClickListener(this);
        fk4.setOnClickListener(this);
        fk5.setOnClickListener(this);
        fk6.setOnClickListener(this);
        fk7.setOnClickListener(this);
        fk8.setOnClickListener(this);
        fk9.setOnClickListener(this);
        fk10.setOnClickListener(this);
        fk11.setOnClickListener(this);
        fk12.setOnClickListener(this);
        fk13.setOnClickListener(this);


        left_arrow.setOnClickListener(this);
        right_arrow.setOnClickListener(this);
        del.setOnClickListener(this);
        go2Cal.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        if (view.getId() != R.id.left_arrow && view.getId() != R.id.right_arrow && view.getId() != R.id.del && view.getId() != R.id.go2cal) {
            if(cnt < 4){
                if(view.getId() == R.id.mh1){
                    ImageChange(mh1, mh1, R.drawable.mh1, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh2){

                    ImageChange(mh2, mh2, R.drawable.mh2, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh3){

                    ImageChange(mh3, mh3, R.drawable.mh3, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh4){

                    ImageChange(mh4, mh4, R.drawable.mh4, R.drawable.mainpoker);
                } else if(view.getId() == R.id.mh5){

                    ImageChange(mh5, mh5, R.drawable.mh5, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh6){

                    ImageChange(mh6, mh6, R.drawable.mh6, R.drawable.mainpoker);
                }
                else if(view.getId() == R.id.mh7){

                    ImageChange(mh7, mh7, R.drawable.mh7, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh8){

                    ImageChange(mh8, mh8, R.drawable.mh8, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh9){

                    ImageChange(mh9, mh9, R.drawable.mh9, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh10){

                    ImageChange(mh10, mh10, R.drawable.mh10, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh11){

                    ImageChange(mh11, mh11, R.drawable.mh11, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh12){

                    ImageChange(mh12, mh12, R.drawable.mh12, R.drawable.mainpoker);
                }else if(view.getId() == R.id.mh13){

                    ImageChange(mh13, mh13, R.drawable.mh13, R.drawable.mainpoker);
                } else if(view.getId() == R.id.ht1){

                    ImageChange(ht1, ht1, R.drawable.ht1, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht2){
                    ImageChange(ht2, ht2, R.drawable.ht2, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht3){
                    ImageChange(ht3, ht3, R.drawable.ht3, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht4){
                    ImageChange(ht4, ht4, R.drawable.ht4, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht5){
                    ImageChange(ht5, ht5, R.drawable.ht5, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht6){
                    ImageChange(ht6, ht6, R.drawable.ht6, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht7){
                    ImageChange(ht7, ht7, R.drawable.ht7, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht8){
                    ImageChange(ht8, ht8, R.drawable.ht8, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht9){
                    ImageChange(ht9, ht9, R.drawable.ht9, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht10){
                    ImageChange(ht10, ht10, R.drawable.ht10, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht11){
                    ImageChange(ht11, ht11, R.drawable.ht11, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht12){
                    ImageChange(ht12, ht12, R.drawable.ht12, R.drawable.mainpoker);
                }else if(view.getId() == R.id.ht13){
                    ImageChange(ht13, ht13, R.drawable.ht13, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx1){
                    ImageChange(hx1, hx1, R.drawable.hx1, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx2){
                    ImageChange(hx2, hx2, R.drawable.hx2, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx3){
                    ImageChange(hx3, hx3, R.drawable.hx3, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx4){
                    ImageChange(hx4, hx4, R.drawable.hx4, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx5){
                    ImageChange(hx5, hx5, R.drawable.hx5, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx6){
                    ImageChange(hx6, hx6, R.drawable.hx6, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx7){
                    ImageChange(hx7,hx7, R.drawable.hx7, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx8){
                    ImageChange(hx8, hx8, R.drawable.hx8, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx9){
                    ImageChange(hx9, hx9, R.drawable.hx9, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx10){
                    ImageChange(hx10,hx10, R.drawable.hx10, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx11){
                    ImageChange(hx11, hx11, R.drawable.hx11, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx12){
                    ImageChange(hx12,hx12, R.drawable.hx12, R.drawable.mainpoker);
                }else if(view.getId() == R.id.hx13){
                    ImageChange(hx13, hx13, R.drawable.hx13, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk1){
                    ImageChange(fk1, fk1, R.drawable.fp1, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk2){
                    ImageChange(fk2, fk2, R.drawable.fp2, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk3){
                    ImageChange(fk3, fk3, R.drawable.fp3, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk4){
                    ImageChange(fk4, fk4, R.drawable.fp4, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk5){
                    ImageChange(fk5,fk5, R.drawable.fp5, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk6){
                    ImageChange(fk6, fk6, R.drawable.fp6, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk7){
                    ImageChange(fk7,fk7, R.drawable.fp7, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk8){
                    ImageChange(fk8, fk8, R.drawable.fp8, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk9){
                    ImageChange(fk9, fk9, R.drawable.fp9, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk10){
                    ImageChange(fk10, fk10, R.drawable.fp10, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk11){
                    ImageChange(fk11, fk11, R.drawable.fp11, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk12){
                    ImageChange(fk12, fk12, R.drawable.fp12, R.drawable.mainpoker);
                }else if(view.getId() == R.id.fk13){
                    ImageChange(fk13, fk13, R.drawable.fp13, R.drawable.mainpoker);
                }
            }
            else{
                Toast.makeText(GameMode2Activity.this, "你已经选择了4张扑克了，请勿再次选择", Toast.LENGTH_LONG).show();
            }
        }
        else {
            int sz = fill.size();
            if(view.getId() == R.id.del){
                if(sz == 0){
                    Toast.makeText(GameMode2Activity.this, "你还未选择扑克，请选择", Toast.LENGTH_LONG).show();
                }else{
                    Map<ImageView, Integer> back = fill.get(sz - 1);
                    Set<ImageView> imageViewSet = back.keySet();
                    ImageView a = (ImageView) imageViewSet.toArray()[0];
                    Integer b = (Integer) back.values().toArray()[0];
                    if(sz == 4){
                        empty4.setImageResource(R.drawable.empty);
                    }else if(sz == 3){
                        empty3.setImageResource(R.drawable.empty);
                    }else if(sz == 2){
                        empty2.setImageResource(R.drawable.empty);
                    }else if(sz == 1){
                        empty1.setImageResource(R.drawable.empty);
                    }
                    a.setImageResource(b);
                    cnt--;
                    trans.remove(sz - 1);
                    fill.remove(sz - 1);
                }
            }else if(view.getId() == R.id.go2cal && sz == 4){
                Intent intent = new Intent(GameMode2Activity.this, CalculateMode2Activity.class);
                intent.putExtra("Data", (Serializable) trans);
                startActivity(intent);
            }else if(view.getId() == R.id.go2cal && sz != 4){
                Toast.makeText(GameMode2Activity.this, "你的扑克数量还未到4，请继续选择扑克", Toast.LENGTH_LONG).show();
            }
        }


    }

    private void ImageChange(@NonNull ImageView view, @Nullable ImageView a , @Nullable Integer b,@NonNull Integer c) {
        cnt++;
        if(cnt == 1){
            empty1.setImageResource(b);
        }else if(cnt == 2){
            empty2.setImageResource(b);
        }else if(cnt == 3){
            empty3.setImageResource(b);
        }else if(cnt == 4){
            empty4.setImageResource(b);
        }
        PairAdd(a, b);
        view.setImageResource(c);
    }

    private void PairAdd(ImageView a, Integer b) {
        Map<ImageView, Integer> tmp = new HashMap<>();
        tmp.put(a, b);
        trans.add(b);
        fill.add(tmp);
    }
}
