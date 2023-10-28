package com.example.poker24;
import java.util.ArrayList;

/*
计算24点程序。
给出4个数，使用+，-，×，÷，四则运算，计算得出24.
2,4,6,8   6*（4-2）*8=24
四个运算符，四个数，穷举法
穷举运算符的排列
穷举运算数的排列

 */
public class calculate {
    char[] operators = {'+', '-', '×', '÷'};
    int[] datas = {2, 4, 6, 8};
    ArrayList<String> groupOperators = new ArrayList<String>();
    ArrayList<ArrayList<Integer>> groupDatas = new ArrayList<>();
    ArrayList<String> results = new ArrayList<>();

    calculate() {
    }

    calculate(int[] datas) {
        this.datas = datas;

    }
    //获得运算符的排列
    private void fetchGroupOperators() {
        for (int i = 0; i < operators.length; i++)
            for (int j = 0; j < operators.length; j++)
                for (int k = 0; k < operators.length; k++) {
                    String temp = "";
                    temp = temp + operators[i] + operators[j] + operators[k];
                    groupOperators.add(temp);

                }
    }
    private void fetchGroupDatas() {
        for (int i = 0; i < datas.length; i++)
            for (int j = 0; j < datas.length; j++)
                for (int m = 0; m < datas.length; m++)
                    for (int k = 0; k < datas.length; k++) {

                        if (i != j && i != k && i != m && j != m && j != k && m != k) {
                            ArrayList<Integer> temp = new ArrayList<>();
                            temp.add(datas[i]);
                            temp.add(datas[j]);
                            temp.add(datas[m]);
                            temp.add(datas[k]);
                            groupDatas.add(temp);

                        }

                    }
    }

    public void compute() {
        this.fetchGroupOperators();
        this.fetchGroupDatas();
        for (ArrayList<Integer> dataSeq : groupDatas) {
            for (String oprs : groupOperators) {

                int t1 = operator2Data(dataSeq.get(0), dataSeq.get(1), oprs.charAt(0));
                int t2 = operator2Data(t1, dataSeq.get(2), oprs.charAt(1));
                int t3 = operator2Data(t2, dataSeq.get(3), oprs.charAt(2));
                if (t3 == 24) {
                    String r = String.format("((%d%c%d)%c%d)%c%d=24", dataSeq.get(0),
                            oprs.charAt(0), dataSeq.get(1), oprs.charAt(1), dataSeq.get(2),
                            oprs.charAt(2), dataSeq.get(3));
                    results.add(r);


                }
                t2 = operator2Data(dataSeq.get(2), dataSeq.get(3), oprs.charAt(2));
                t3 = operator2Data(t1, t2, oprs.charAt(1));
                if (t3 == 24) {
                    String r = String.format("(%d%c%d)%c(%d%c%d)=24", dataSeq.get(0),
                            oprs.charAt(0), dataSeq.get(1), oprs.charAt(1), dataSeq.get(2),
                            oprs.charAt(2), dataSeq.get(3));
                    results.add(r);
                }

            }

        }


    }

    //计算两个数
    private int operator2Data(int d1, int d2, char opr) {
        if (opr == '+') {
            return d1 + d2;
        } else if (opr == '×') {
            return d1 * d2;


        } else if (opr == '-') {
            if (d1 < d2) {
                return -10000;
            } else {
                return d1 - d2;
            }
        } else {
            if (d2 !=0 && d1 % d2 == 0) {
                return d1 / d2;
            } else {
                return 999991;
            }
        }


    }


}
