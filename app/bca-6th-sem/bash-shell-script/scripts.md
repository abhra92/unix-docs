## Lab Questions

1. Write a script to display the following system details:
   - Total and free memory
   - Disk usage percentage of each mounted partition
   - Number of active processes

2. Implement a feature to save the report to a file with a timestamp in the filename (e.g., `System_Report_&lt;date&gt;.txt`).

3. Extend the script to alert the user if disk usage exceeds **80%** or memory usage goes below **10%**.

---

## System Monitor

```bash
curl -LO https://raw.githubusercontent.com/abhra92/linux-monitoring-tools/refs/heads/master/system_monitor.sh
chmod +x system_monitor.sh
./system_monitor.sh
```

---

## System Monitor (Simple)

```bash
curl -LO https://raw.githubusercontent.com/abhra92/linux-monitoring-tools/refs/heads/master/system_monitor_simple.sh
chmod +x system_monitor_simple.sh
./system_monitor_simple.sh
```

---

## Test Demo

```bash
curl -LO https://raw.githubusercontent.com/abhra92/linux-monitoring-tools/refs/heads/master/test_demo.sh
chmod +x test_demo.sh
./test_demo.sh
```
