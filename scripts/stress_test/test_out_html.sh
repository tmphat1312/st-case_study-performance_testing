mkdir -p test_results && K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=/test_results/stress_test.html k6 run --config ./config/stress_test.json script.js