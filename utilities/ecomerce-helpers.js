/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife

 * */

import React from "react";

export function calculateAmount(obj) {
    return Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);
}

export function calculateCartQuantity(obj) {
    //console.log("CALCULA VALOR : ", obj)
    return Object.values(obj).reduce((acc, { quantity }) => acc + quantity, 0);
}

export function caculateArrayQuantity(obj) {
    return Object.values(obj).reduce((acc) => acc + 1, 0);
}
