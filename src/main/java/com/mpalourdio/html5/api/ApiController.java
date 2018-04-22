package com.mpalourdio.html5.api;

import com.blueconic.browscap.Capabilities;
import com.blueconic.browscap.ParseException;
import com.blueconic.browscap.UserAgentParser;
import com.blueconic.browscap.UserAgentService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ApiController {

    private final UserAgentParser parser;
    private byte[] fileContent;
    private String fileName;
    private String contentType;
    private final Logger logger = LoggerFactory.getLogger(getClass());


    public ApiController() throws IOException, ParseException {
        parser = new UserAgentService().loadParser();
    }

    @PostMapping(path = "/service1")
    public ResponseEntity<List<String>> consumeMePlease() {
        List<String> results = new ArrayList<>();
        results.add("Hey, I am a response from ApiController");

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "x-requested-with")
    @GetMapping(path = "/slowservice")
    public ResponseEntity<List<String>> slowService() throws InterruptedException {
        List<String> results = new ArrayList<>();
        results.add("Hey, I am the slow response");
        Thread.sleep(3000);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("files") MultipartFile files) throws IOException {
        //VERY ugly, make things stateful...Just for quick tests
        fileContent = IOUtils.toByteArray(files.getInputStream());
        contentType = files.getContentType();
        fileName = files.getOriginalFilename();

        logger.info(fileName + " sent");

        return fileName;
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> download() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentDispositionFormData("attachment", fileName);
        responseHeaders.set("Content-Type", contentType);

        return new ResponseEntity<>(fileContent, responseHeaders, HttpStatus.OK);
    }

    @GetMapping(path = "/datalist")
    public List<DataListOptions> getOptions(HttpServletResponse response, HttpServletRequest request) {
        generateCookie(response, request);

        List<DataListOptions> result = new LinkedList<>();

        Integer i = 0;
        while (i < 10) {
            result.add(new DataListOptions("kiwi", "option1"));
            result.add(new DataListOptions("Raspberry", "option2"));
            result.add(new DataListOptions("Cherry", "option3"));
            i++;
        }

        return result;
    }

    @GetMapping(path = "/useragent")
    public Capabilities getOptions(HttpServletRequest request) {
        return parser.parse(request.getHeader("user-agent"));
    }

    private void generateCookie(HttpServletResponse response, HttpServletRequest request) {
        Cookie cookie = new Cookie("foo", "bar");
        cookie.setPath(request.getContextPath());
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    public static class DataListOptions {

        public String name;
        public String value;

        public DataListOptions() {
        }

        public DataListOptions(String name, String value) {
            this.name = name;
            this.value = value;
        }
    }
}
