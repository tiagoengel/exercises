function swap(arr, left, right) {
  var tmp = arr[left];
  arr[left] = arr[right];
  arr[right] = tmp;
}

function splitAndSort(arr, start, end) {
  var pivot = arr[start], left = start+1, right = end;

  while (left <= right) {
    while (arr[left] < pivot ) left++;
    while (arr[right] > pivot) right--;

    if (left <= right) swap(arr, left++, right--);
  }

  swap(arr, start, right);
  return right;
}

function quicksort(arr, start, end) {
  if (end < start) return;

  var splitPoint = splitAndSort(arr, start, end);

  quicksort(arr, start, splitPoint-1);
  quicksort(arr, splitPoint+1, end);
}

module.exports = function(arr) {
  var toSort = arr.slice();
  quicksort(toSort, 0, toSort.length-1);
  return toSort;
};
