public class Main {
    public static void main(String[] args) throws Exception {
        LongestIncreasingSubsequence lis = new LongestIncreasingSubsequence();
        //test cases taken from the examples of the LeetCode problem
        System.out.println(lis.lengthOfLIS(new int[]{10,9,2,5,3,7,101,18}));
        System.out.println(lis.lengthOfLIS(new int[]{0,1,0,3,2,3}));
        System.out.println(lis.lengthOfLIS(new int[]{7,7,7,7,7,7,7}));
    }
}
