//Class of methods to solve the longest increasing subsequence problem, LeetCode 300
//the class is renamed to Solution when the code is submited to LeetCode
public class LongestIncreasingSubsequence {

    //Finds the length of the longest strictly increasing subsequence of nums
    public int lengthOfLIS(int[] nums) {
        int[] dp = buildTable(nums);
        return largest(dp);
    }

    //dp[i] = length of the longest increasing subsequence that ends exactly at index i
    private int[] buildTable(int[] nums){
        int n = nums.length;
        int[] dp = new int[n];
        for(int i = 0; i < n; i++){
            //nums[i] alone is always an increasing subsequence of length 1
            dp[i] = 1;
            //nums[i] can extend any subsequence that ends before it on a smaller value
            for(int j = 0; j < i; j++){
                if(nums[j] < nums[i]){
                    //it either keeps the previous length or extends it by 1 if it found a larger element
                    dp[i] = max(dp[i], 1 + dp[j]);
                }
            }
        }
        return dp;
    }

    //Search for the largest value in the dp table
    private int largest(int[] dp){
        int best = 0;
        for(int length : dp){
            best = max(best, length);
        }
        return best;
    }

    //Bigger of two subsequence lengths
    private int max(int a, int b){
        int bigger = a;
        if(b > bigger){
            bigger = b;
        }
        return bigger;
    }

}
